import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from './style.module.css';
import { Accordion } from "../../../components/accordion/accordion";

const Home = () => {
const items = [
   {
      title: "Section 1",
      content: "This is the content of section 1"
   },
   {
      title: "Section 2",
      content: "This is the content of section 2"
   },
   {
      title: "Section 3",
      content: "This is the content of section 3"
   }
]
    return (
        <div className={styles.container}>
            <div className={styles.page_body}>
                <div className={styles.body_left}>
                    <div className={styles.page_header}>Announcements</div>
                    <div className={styles.announcements_container}>
                        <Accordion items={items}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Home;