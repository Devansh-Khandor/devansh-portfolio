import React from "react";
import { useIsMobile } from "../../../hooks";
import styles from "../WakatimeStats/WakatimeStats.module.css";

/** ===== Types ===== */
type Badge = {
  name: string;
  icon?: string;        // url if provided by the API
  description?: string;
  link?: string;
};

type Submission = {
  title?: string;
  problemCode?: string;
  verdict?: string;     // e.g. AC, WA, TLE
  time?: string;        // ISO or plain
  contest?: string;
  link?: string;        // direct URL to the problem
};

type CodeChefData = {
  name?: string;
  username?: string;
  rating?: number;
  ratingText?: string;
  highestRating?: number;
  stars?: string;
  globalRank?: number;
  countryRank?: number;
  totalSolved?: number;

  badges?: Badge[];
  recentSubmissions?: Submission[];
};

/** ===== Config ===== */
const CODECHEF_USERNAME = "devanshkhandor";
const API_PRIMARY  = `https://codechef-api.vercel.app/handle/${CODECHEF_USERNAME}`;
const API_FALLBACK = `https://competeapi.vercel.app/user/codechef/${CODECHEF_USERNAME}`;
// Some scrapers expose extra endpoints; try them if available (best-effort)
const API_SUBMISSIONS_1 = `https://codechef-api.vercel.app/handle/${CODECHEF_USERNAME}/recent`;
const API_SUBMISSIONS_2 = `https://competeapi.vercel.app/user/codechef/${CODECHEF_USERNAME}/recent`;

const CACHE_KEY = `codechef_data_${CODECHEF_USERNAME}`;
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6h

/** Optional local overrides for missing fields */
const OVERRIDES: Partial<CodeChefData> = {
  stars: "★",
  totalSolved: 1193,
};

/** ===== Helpers ===== */
const problemUrl = (code?: string) =>
  code ? `https://www.codechef.com/problems/${code}` : undefined;

function normalize(raw: any): CodeChefData {
  let d: any = raw?.data ?? raw;
  if (Array.isArray(d)) {
    d =
      d.find(
        (x: any) =>
          x &&
          (x.rating ||
            x.stars ||
            x.global_rank ||
            x.handle ||
            x.username ||
            x.country_rank)
      ) ?? d[0];
  }

  const ratingRaw =
    d?.rating ?? d?.currentRating ?? d?.current_rating ?? d?.codechef_rating;
  const ratingNum = Number(ratingRaw);
  const ratingText =
    typeof ratingRaw === "string"
      ? ratingRaw
      : Number.isFinite(ratingNum)
      ? String(ratingNum)
      : undefined;

  const highestRating = Number(
    d?.highest_rating ?? d?.highestRating ?? d?.max_rating
  );
  const stars = String(d?.stars ?? d?.star ?? d?.rating_stars ?? "").trim();
  const username = d?.handle ?? d?.username ?? CODECHEF_USERNAME;
  const name = d?.name ?? d?.fullname ?? undefined;

  const globalRank =
    parseInt(d?.global_rank ?? d?.globalRank ?? d?.rank_global ?? d?.global) ||
    undefined;
  const countryRank =
    parseInt(
      d?.country_rank ?? d?.countryRank ?? d?.rank_country ?? d?.country
    ) || undefined;

  // ---- solved count (TS-safe) ----
  let totalSolved: number | undefined;
  const solvedObj =
    d?.solved ?? d?.fully_solved ?? d?.["Fully Solved"] ?? d?.solved_count;

  if (typeof solvedObj === "number") {
    totalSolved = solvedObj;
  } else if (typeof d?.total_problems_solved === "number") {
    totalSolved = d.total_problems_solved;
  } else if (
    solvedObj &&
    typeof solvedObj === "object" &&
    !Array.isArray(solvedObj)
  ) {
    const values = Object.values(solvedObj as Record<string, unknown>);
    totalSolved = values.reduce<number>((sum, v) => {
      const n = typeof v === "number" ? v : Number(v) || 0;
      return sum + n;
    }, 0);
  }

  // ---- badges (best-effort normalize) ----
  let badges: Badge[] | undefined;
  const rawBadges =
    d?.badges ?? d?.achievements ?? d?.badges_list ?? d?.profile_badges;
  if (Array.isArray(rawBadges)) {
    badges = rawBadges
      .map((b: any) => ({
        name:
          b?.name ??
          b?.title ??
          b?.badge_name ??
          b?.label ??
          undefined,
        icon: b?.icon ?? b?.image ?? b?.badge_icon ?? undefined,
        description: b?.description ?? b?.desc ?? undefined,
        link: b?.link ?? b?.url ?? undefined,
      }))
      .filter((b: Badge) => !!b.name);
  }

  // ---- recent submissions (best-effort normalize) ----
  let recentSubmissions: Submission[] | undefined;
  const rs =
    d?.recent_submissions ??
    d?.recentSubmissions ??
    d?.submissions ??
    d?.recent ??
    d?.latest_submissions;
  if (Array.isArray(rs)) {
    recentSubmissions = rs
      .map((s: any) => {
        const code =
          s?.problemCode ??
          s?.problem_code ??
          s?.code ??
          s?.problem ??
          undefined;
        return {
          title: s?.title ?? s?.problemName ?? s?.problem_name ?? code,
          problemCode: code,
          verdict: s?.verdict ?? s?.status ?? s?.result,
          time: s?.time ?? s?.date ?? s?.submitted_at,
          contest: s?.contest ?? s?.contest_code ?? undefined,
          link: s?.link ?? problemUrl(code),
        };
      })
      .filter((s: Submission) => s.title || s.problemCode || s.link);
  }

  return {
    name,
    username,
    rating: Number.isFinite(ratingNum) ? ratingNum : undefined,
    ratingText,
    highestRating: Number.isFinite(highestRating) ? highestRating : undefined,
    stars,
    globalRank,
    countryRank,
    totalSolved,
    badges,
    recentSubmissions,
  };
}

const CodeChefStats: React.FC = () => {
  const [data, setData] = React.useState<CodeChefData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // cache
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        const now = Date.now();
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (now - cached.timestamp < CACHE_TTL) {
            if (mounted) { setData(cached.data); setLoading(false); }
            return;
          }
        }

        const fetchJson = async (url: string) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
          return res.json();
        };

        // profile
        let raw: any;
        try { raw = await fetchJson(API_PRIMARY); }
        catch { raw = await fetchJson(API_FALLBACK); }
        let normalized = normalize(raw);

        // optional: try separate endpoints for recent submissions
        try {
          const rsRaw = await fetchJson(API_SUBMISSIONS_1);
          const rsNorm = normalize(rsRaw);
          if (rsNorm.recentSubmissions?.length) {
            normalized.recentSubmissions = rsNorm.recentSubmissions;
          }
        } catch {
          try {
            const rsRaw = await fetchJson(API_SUBMISSIONS_2);
            const rsNorm = normalize(rsRaw);
            if (rsNorm.recentSubmissions?.length) {
              normalized.recentSubmissions = rsNorm.recentSubmissions;
            }
          } catch { /* ignore */ }
        }

        // merge overrides for missing fields
        const merged: CodeChefData = {
          ...normalized,
          stars: normalized.stars || OVERRIDES.stars,
          totalSolved: normalized.totalSolved ?? OVERRIDES.totalSolved,
        };

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: merged, timestamp: now })
        );
        if (mounted) setData(merged);
      } catch (e: any) {
        const cachedRaw2 = localStorage.getItem(CACHE_KEY);
        if (cachedRaw2) {
          const cached = JSON.parse(cachedRaw2);
          if (mounted) setData(cached.data);
        } else {
          if (mounted) setError("Unable to load CodeChef stats");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          Loading CodeChef stats...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return <div className={styles.errorContainer}>{error || "No data"}</div>;
  }

  const ratingDisplay =
    data.rating !== undefined
      ? data.rating
      : data.ratingText
      ? data.ratingText
      : "—";

  const cards = [
    { label: "Rating",       value: ratingDisplay,                 cls: styles.statCardBlue   },
    { label: "Stars",        value: data.stars || "—",             cls: styles.statCardGreen  },
    { label: "Global Rank",  value: data.globalRank ? `#${data.globalRank}` : "—",  cls: styles.statCardOrange },
    { label: "Country Rank", value: data.countryRank ? `#${data.countryRank}` : "—", cls: styles.statCardOrange },
    { label: "Solved",       value: data.totalSolved ?? "—",       cls: styles.statCardGreen  },
  ];

  /** simple color for verdicts */
  const verdictClass = (v?: string) => {
    if (!v) return "";
    const x = v.toUpperCase();
    if (x.includes("AC")) return styles.statCardGreen;
    if (x.includes("WA") || x.includes("RE")) return styles.statCardOrange;
    if (x.includes("TLE") || x.includes("MLE")) return styles.statCardOrange;
    return styles.statCardBlue;
  };

  return (
    <div className={styles.container}>
      {/* Top metric cards (same as before) */}
      <div className={`${styles.statsGrid} ${isMobile ? styles.statsGridMobile : styles.statsGridDesktop}`}>
        {cards.map((c, i) => (
          <div key={i} className={`${styles.statCard} ${c.cls}`}>
            <div className={styles.statValue}>{c.value}</div>
            <div className={styles.statLabel}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements & Badges (LeetCode-like) */}
      {data.badges?.length ? (
        <div className={styles.yearlyContainer}>
          <h4 className={styles.yearlyTitle}>Achievements & Badges</h4>
          <div className={styles.monthsGrid}>
            {data.badges.slice(0, 18).map((b, idx) => (
              <div key={idx} className={styles.monthCard} title={b.description || b.name}>
                {b.icon ? (
                  <img src={b.icon} alt={b.name} style={{ width: 24, height: 24, marginRight: 8, borderRadius: 4 }} />
                ) : null}
                <div className={styles.monthName} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {b.link ? (
                    <a href={b.link} target="_blank" rel="noopener noreferrer">{b.name}</a>
                  ) : (
                    b.name
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Recent Submissions (LeetCode-like list) */}
      {data.recentSubmissions?.length ? (
        <div className={styles.chartContainer}>
          <h4 className={styles.chartTitle}>Recent Submissions</h4>
          <div style={{ display: "grid", gap: 8 }}>
            {data.recentSubmissions.slice(0, 10).map((s, i) => (
              <div key={i} className={`${styles.statCard} ${verdictClass(s.verdict)}`}
                   style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={styles.statLabel}>
                    {s.title || s.problemCode}
                    {s.contest ? ` • ${s.contest}` : ""}
                  </span>
                  <span className={styles.statValue} style={{ fontSize: 14 }}>
                    {s.verdict || "—"} {s.time ? `• ${new Date(s.time).toLocaleString()}` : ""}
                  </span>
                </div>
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className={styles.statLabel}>
                    Open →
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Profile link */}
      <div className={styles.summaryContainer}>
        <p className={styles.summaryTitle}>🏅 CodeChef Snapshot</p>
        <p className={styles.summaryText}>
          {data.name ? <strong>{data.name}</strong> : null} ({data.username}) —{" "}
          {typeof ratingDisplay === "string" ? ratingDisplay : `rating ${ratingDisplay}`}
          {data.highestRating ? ` • highest ${data.highestRating}` : ""}
          {data.stars ? ` • ${data.stars}` : ""}.
        </p>
        <p className={styles.summaryText}>
          <a
            href={`https://www.codechef.com/users/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View CodeChef profile →
          </a>
        </p>
      </div>
    </div>
  );
};

export default CodeChefStats;
