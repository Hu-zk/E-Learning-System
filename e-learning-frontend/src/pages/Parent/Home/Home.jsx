import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from './style.module.css';

const Home = () => {


    return (
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Announcements</div>
                    <div className={styles.announcements_container}>
                            <div>-hello</div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;