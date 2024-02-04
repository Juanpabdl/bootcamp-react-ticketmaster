import { useState } from "react";
import EventItem from "./components/EventItem";
import eventsJSON from "../../data/events.json";

const Events = ({searchTerm}) =>{
    const [data] = useState(eventsJSON);
    const { _embedded: {events}} = data

    const handleEventItemClick = (id) =>{
        console.log("Event item clicked: " + id)
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
            Eventos
            {renderEvents()}
        </div>
    )
}
export default Events;