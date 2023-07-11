import Image from "next/image";
import { useState } from "react";
import styles from "../Offcanvas/Offcanvas.module.css";
import settingIcon from "../../../../public/setting.png"

export default function Offcanvas({ title, btnLabel, children }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <>
      <button className={styles.btnToggle}
        onClick={() => {
          setShowOffcanvas(true);
        }}
      >
        <Image src={settingIcon} alt="Configuration icon" style={{ width: '17px', height: '17px'}} />
        {btnLabel}
      </button>
      <div
        onClick={() => {
          setShowOffcanvas(true);
        }}
        className={`${styles.overlay} ${showOffcanvas ? "" : styles.hidden}`}
      >
        <div onClick={(e) => e.stopPropagation()} className={styles.offcanvas}>
          <div className={styles.header}>
            <h3>{title}</h3>
            <button
              onClick={() => {
                setShowOffcanvas(false);
              }}
            >
              x
            </button>
          </div>
          <div className={styles.offcanvas}>{children}</div>
        </div>
      </div>
    </>
  );
}