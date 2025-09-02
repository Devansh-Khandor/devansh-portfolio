import React, { useEffect } from "react";
import Container from "./components/Container";
import styles from "./App.module.css";
import Cam from "./assets/Cam.png";

const App: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className={styles.laptopScreen}>
        <div className={styles.cameraIcon}>
          <img src={Cam} alt="cameraIcon"></img>
        </div>
        <div className={styles.wrapper}>
          <Container />
        </div>
        <div className={styles.laptopBase}>Devansh-A-Khandor</div>
      </div>
    </>
  );
};

export default App;
