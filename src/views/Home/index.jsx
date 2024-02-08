import { useState, useRef, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import useEventsData from '../../hooks/useEventsData'

import styles from './Home.module.css';

const Home = () => {
    const { events, isLoading, error, page, fetchEvents } = useEventsData()
    const [searchTerm,setSearchTerm] = useState('')
    const containerRef = useRef()

    useEffect(()=>{
        fetchEvents();
    }, []);

    const handlePageClick = ({selected}) => {
        fetchEvents(`&keyword=${searchTerm}&page${selected}`)
    }

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