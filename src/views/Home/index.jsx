import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import ReactPaginate from 'react-paginate';
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";

import useEventsResults from "../../state/events-results";

import styles from './Home.module.css';

const Home = () => {
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
    const page = useMemo(() => data?.page || {}, [data?.page]);
    const [searchTerm,setSearchTerm] = useState('');
    const [isToggle, setIsToggle] = useState(false);

    const containerRef = useRef();

    /*
    Usa la referencia de fetchEvents para no tener que 
    incluirlo en el arreglo de dependencias de useEffect
    para tener la referencia y que esta solo tenga que 
    ejecutarse al cargar la página y no cada vex que cambie
    */
    const fetchMyEventsRef = useRef();
    fetchMyEventsRef.current = fetchEvents;

    useEffect(()=>{
        fetchMyEventsRef.current();
    }, []);

    const handlePageClick = useCallback(({selected}) => {
        fetchEvents(`&keyword=${searchTerm}&page${selected}`)
    }, [searchTerm, fetchEvents]);

    const handleNavbarSearch = (term) => {
        setSearchTerm(term)
        fetchEvents(`&keyword=${term}`)
    };

    const renderEventContainer = () => {
        if (isLoading){
            return ( <div>Cargando resultados...</div> )
        }

        if (error){
            return ( <div>Ha ocurrido un error</div> )
        }

        return (
            <>
                <button onClick={()=> setIsToggle(!isToggle)}>{isToggle ? 'ON':'OFF'}</button>
                <Events searchTerm={searchTerm} events={events}/>
                <ReactPaginate 
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disabledPage}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}/>
            </>
        )
    };

    return (
        <>
            <Navbar onSearch={handleNavbarSearch} ref={containerRef}/>
            {renderEventContainer()}
        </>
    )
};

export default Home;