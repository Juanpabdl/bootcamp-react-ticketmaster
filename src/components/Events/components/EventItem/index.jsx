//import './styles.css'
import styles from './EventItem.module.css'

const EventItem = ({info, id, name, image, onEventClick}) => {

    const handleSeeMoreClick = (event) =>{
        event.stopPropagation()
        onEventClick(id)
    };

    return (
        <div onClick={()=> console.log('Padre clickeado')} className={`${styles.eventItemContainer} ${styles.anotherContainer}`}>
            <img src={image} 
            alt={name} 
            width={200}
             height={200}/>
            <div className={styles.eventInfoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                <p className={styles.eventInfo}>{info}</p>
                <button className={styles.eventSeeMore} onClick={handleSeeMoreClick}>Ver más</button>
            </div>
        </div>
    )
};
export default EventItem;