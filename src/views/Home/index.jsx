import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import useEventsData from '../../hooks/useEventsData'

const Home = () => {
    const { events, isLoading, error, fetchEvents } = useEventsData()
    const [searchTerm,setSearchTerm] = useState('')
    const containerRef = useRef()

    useEffect(()=>{
        fetchEvents();
    },[])

    const handleNavbarSearch = (term) => {
        setSearchTerm(term)
        fetchEvents(`&keyword=${term}`)
    };

    if (error){
        return(<div>Ha ocurrido un error</div>)
    }

    if (isLoading){
        return(<div>Cargando resultados...</div>)
    }

    return (
        <>
            <Navbar onSearch={handleNavbarSearch} ref={containerRef}/>
            <Events searchTerm={searchTerm} events={events}/>
        </>
    )
};

export default Home;