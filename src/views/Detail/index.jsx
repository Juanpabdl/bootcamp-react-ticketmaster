import { format } from "date-fns";
import { es } from "date-fns/locale";

import eventFetcher from '../../utils/fetchEvents';

import styles from './Detail.module.css';

const pathName = window.location.pathname;
const resource = eventFetcher(pathName.substring(8,pathName.length));

const Detail = () => {

    const eventData = resource.eventDetail.read();

    return(
        <div className={styles.detailContainer}>
            <div className={styles.mainInfoContainer}>
                <img src={eventData.images?.[0].url} className={styles.eventImage} alt={eventData.name}/>
                <h4 className={styles.eventName}>{eventData.name}</h4>
                <p className={styles.eventInfo}>{eventData.info}</p>
                {
                    eventData.dates?.start.dateTime ? <p className={styles.eventDate}> {format(new Date(eventData.dates?.start.dateTime), 'd LLLL yyyy H:mm', {locale: es})} hrs</p> : null
                }
                <div className={styles.seatInfoContainer}>
                    <h6 className={styles.seatMapTitle}>Mapa del evento</h6>
                    <img src={eventData.seatmap?.staticUrl} alt='Seat map event' />
                    <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
                    <p className={styles.priceRangeLegend}>Rango de precios: {eventData.priceRanges?.[0].min} - {eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}</p>
                </div>
            </div>
            <a href={eventData.url}>Ve por tus boletos</a>
        </div>
    )
};

export default Detail;