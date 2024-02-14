//import { Link } from 'react-router-dom';
import styles from './EventItem.module.css'
import HeartFilled from '../../../../assets/hearth-filled.png';
import HeartUnfilled from'../../../../assets/hearth-unfilled.png';
import useLikeEvents from '../../../../hooks/useLikeEvents';

const EventItem = ({info, id, name, image, onEventClick}) => {
    const {isEventLiked, toggleEventLike} = useLikeEvents(id);

    const handleSeeMoreClick = (event) =>{
        event.stopPropagation()
        onEventClick(id)
    };

    const handleHeartClick = () => {
        toggleEventLike();
    }

    return (
        <div onClick={()=> console.log('Padre clickeado')} className={`${styles.eventItemContainer} ${styles.anotherContainer}`}>
            <div className={styles.imageContainer}>
                <img src={ isEventLiked ? HeartFilled : HeartUnfilled } alt='Heart button' className={styles.heartImage} onClick={handleHeartClick}/>
                <img src={image} alt={name} width={200} height={200}/>
            </div>
            
            <div className={styles.eventInfoContainer}>
                <h4 className={styles.eventName}>{name}</h4>
                <p className={styles.eventInfo}>{info}</p>
                <button className={styles.eventSeeMore} onClick={handleSeeMoreClick}>
                    {/*<Link to={`/detail/${id}`}>Ver más</Link>*/}
                    Ver mas
                </button>
            </div>
        </div>
    )
};
export default EventItem;