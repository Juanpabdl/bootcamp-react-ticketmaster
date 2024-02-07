import { useNavigate } from 'react-router-dom';
import EventItem from "./components/EventItem";

const Events = ({ searchTerm, events }) =>{
    const navigate = useNavigate()

    const handleEventItemClick = (id) =>{
        navigate(`/detail/${id}`)
    };

    const renderEvents = () => {
        let eventsFiltered = events;

        if (searchTerm.length > 0){
            eventsFiltered = eventsFiltered.filter((item) => item.name.toLocaleLowerCase().includes(searchTerm));
        }

        return eventsFiltered.map((eventItem) => (
            <EventItem key={eventItem.id} 
            name={eventItem.name} 
            info={eventItem.info}
            image={eventItem.images[0].url}
            id = {eventItem.id}
            onEventClick={handleEventItemClick} />
        ))
    };

    return(
        <div>
            <p style={{ fontSize: 24, fontWeight:'bold' }}>Eventos</p>
            {renderEvents()}
        </div>
    )
}
export default Events;