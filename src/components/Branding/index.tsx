import { useSelf } from "@liveblocks/react/suspense";
import styles from "./index.module.css";

export default function Branding() {
    const name = useSelf((me) => me.info.name);

    return (
        <div className={styles.container} onPointerDown={(e) => e.stopPropagation()}>
            <img src="/icon.png" alt="LXDraw" className={styles.icon} />
            <div className={styles.info}>
                <span className={styles.app_name}>LXDraw</span>
                <span className={styles.user_name}>{name}</span>
            </div>
        </div>
    );
}
