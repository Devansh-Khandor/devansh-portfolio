import React from "react";
import { useIsMobile } from "../../../hooks";
import styles from "./WakatimeStats.module.css";

interface Day {
  date: string;
  total: number;
}

interface WakatimeResponse {
  days: Day[];
}

interface CachedData {
  data: WakatimeResponse;
  timestamp: number;
}

/** 🔗 Your public WakaTime Share JSON */
const WAKATIME_SHARE_JSON =
  "https://wakatime.com/share/@DevanshKhandor/b1d218ad-96d2-478d-b0e5-facb91fa506f.json";

/** 🧠 Bump the cache key so old data isn’t reused */
const CACHE_KEY = `wakatime_data_${WAKATIME_SHARE_JSON}`;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

/** Normalize various WakaTime share JSON shapes into { days: [{date,total}] } */
function normalizeWaka(payload: any): WakatimeResponse {
  // 1) Direct: { days: [{ date, total } ...] }
  if (Array.isArray(payload?.days)) return { days: payload.days };

  // 2) Nested: { data: { days: [...] } }
  if (Array.isArray(payload?.data?.days)) return { days: payload.data.days };

  // 3) Array of entries under data (e.g., share types returning daily entries)
  //    Try to derive date + total seconds from common fields.
  if (Array.isArray(payload?.data)) {
    const days: Day[] = payload.data
      .map((d: any) => {
        const dateStr =
          d.date ??
          (typeof d.range === "string" ? d.range : d.range?.date) ??
          d.start ??
          "";
        const totalSeconds =
          d.grand_total?.total_seconds ??
          d.total_seconds ??
          d.total ??
          d.duration ??
          0;

        const date = String(dateStr).slice(0, 10);
        const total = Number(totalSeconds);

        if (!date || Number.isNaN(total)) return null;
        return { date, total };
      })
      .filter(Boolean) as Day[];

    if (days.length) return { days };
  }

  throw new Error("Unsupported WakaTime share JSON shape");
}

const WakatimeStats: React.FC = () => {
  const [wakatimeData, setWakatimeData] =
    React.useState<WakatimeResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const fetchWakatimeData = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          const now = Date.now();
          if (now - parsed.timestamp < CACHE_DURATION) {
            setWakatimeData(parsed.data);
            setLoading(false);
            return;
          }
        }

        const response = await fetch(WAKATIME_SHARE_JSON);
        if (!response.ok) throw new Error("Failed to fetch data");

        const raw = await response.json();
        const data = normalizeWaka(raw);

        const cacheData: CachedData = { data, timestamp: Date.now() };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        setWakatimeData(data);
      } catch (err: any) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const parsed: CachedData = JSON.parse(cachedData);
          setWakatimeData(parsed.data);
        } else {
          setError(err?.message || "Unable to load coding stats");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWakatimeData();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          Loading coding stats...
        </div>
      </div>
    );
  }

  if (error || !wakatimeData?.days) {
    return <div className={styles.errorContainer}>{error || "No data available"}</div>;
  }

  const days = wakatimeData.days;
  const totalSeconds = days.reduce((sum: number, day: Day) => sum + day.total, 0);
  const totalHours = Math.floor(totalSeconds / 3600);
  const avgHoursPerDay = (totalHours / days.length).toFixed(1);
  const maxDaySeconds = Math.max(...days.map((day: Day) => day.total));
  const maxDayHours = (maxDaySeconds / 3600).toFixed(1);

  const recentDays = days.slice(-30);
  const maxRecent = Math.max(...recentDays.map((day: Day) => day.total));

  const monthlyData = days.reduce((acc: { [key: string]: number }, day: Day) => {
    const date = new Date(day.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    acc[monthKey] = (acc[monthKey] || 0) + day.total;
    return acc;
  }, {});

  const last12Months = Object.entries(monthlyData)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 12)
    .reverse()
    .map(([month, seconds]) => ({
      month,
      hours: Math.round((seconds as number) / 3600),
      monthName: new Date(month + "-01").toLocaleDateString("en", { month: "short" }),
      year: new Date(month + "-01").toLocaleDateString("en", { year: "numeric" }),
    }));

  const maxDailyHours = Math.max(...days.map(day => day.total / 3600));
  const _heatmapData = days.slice(-365).map(day => {
    const hours = day.total / 3600;
    let intensity = "heatmapLow";
    if (hours > maxDailyHours * 0.7) intensity = "heatmapVeryHigh";
    else if (hours > maxDailyHours * 0.5) intensity = "heatmapHigh";
    else if (hours > maxDailyHours * 0.2) intensity = "heatmapMedium";
    return { date: day.date, hours: hours.toFixed(1), intensity };
  });

  return (
    <div className={styles.container}>
      <div
        className={`${styles.statsGrid} ${
          isMobile ? styles.statsGridMobile : styles.statsGridDesktop
        }`}
      >
        <div className={`${styles.statCard} ${styles.statCardBlue}`}>
          <div className={styles.statValue}>{totalHours}h</div>
          <div className={styles.statLabel}>Total Hours</div>
        </div>

        <div className={`${styles.statCard} ${styles.statCardGreen}`}>
          <div className={styles.statValue}>{avgHoursPerDay}h</div>
          <div className={styles.statLabel}>Daily Average</div>
        </div>

        <div
          className={`${styles.statCard} ${styles.statCardOrange} ${
            isMobile ? styles.statCardMobileFullWidth : ""
          }`}
        >
          <div className={styles.statValue}>{maxDayHours}h</div>
          <div className={styles.statLabel}>Best Day</div>
        </div>
      </div>

      <div className={styles.yearlyContainer}>
        <h4 className={styles.yearlyTitle}>Yearly Coding Activity</h4>
        <div className={styles.monthsGrid}>
          {last12Months.reverse().map(({ month, hours, monthName, year }) => (
            <div key={month} className={styles.monthCard}>
              <div className={styles.monthName}>
                {monthName} {year}
              </div>
              <div className={styles.monthHours}>{hours}h</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <h4 className={styles.chartTitle}>Last 30 Days Activity</h4>
        <div className={styles.chartBars}>
          {recentDays.map((day: Day, index: number) => {
            const height = maxRecent > 0 ? (day.total / maxRecent) * 70 : 0;
            const hours = (day.total / 3600).toFixed(1);
            return (
              <div
                key={index}
                className={`${styles.chartBar} ${
                  day.total > 0 ? styles.chartBarActive : styles.chartBarInactive
                }`}
                style={{ height: `${Math.max(height, 2)}px` }}
                title={`${new Date(day.date).toLocaleDateString()}: ${hours}h`}
              />
            );
          })}
        </div>
        <div className={styles.chartLabels}>
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      <div className={styles.summaryContainer}>
        <p className={styles.summaryTitle}>📊 Coding Activity Summary</p>
        <p className={styles.summaryText}>
          Over the past {days.length} days, I've logged{" "}
          <strong>{totalHours} hours</strong> of coding time. That's an average of{" "}
          <strong>{avgHoursPerDay} hours per day</strong>, with my most productive day
          reaching <strong>{maxDayHours} hours</strong>.
        </p>
      </div>
    </div>
  );
};

export default WakatimeStats;
