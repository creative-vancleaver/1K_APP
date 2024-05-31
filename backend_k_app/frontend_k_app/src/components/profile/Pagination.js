import React, { useState, useEffect } from 'react';

const Pagination = ( { currentPage, totalPages, handlePageChange }) => {

    const maxVisiblePages = 10;
    const sidePageCount = Math.floor(maxVisiblePages / 2);

    const [page, setPage] = useState(currentPage);

    // const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    // const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    const startPage = Math.max(page - sidePageCount, 1);
    const endPage = Math.min(startPage + maxVisiblePages -1, totalPages);

    let pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => 
        startPage + index);

    if (page <= sidePageCount) {
        pageNumbers = pageNumbers.slice(0, maxVisiblePages);
    } else if (page > totalPages - sidePageCount) {
        pageNumbers = pageNumbers.slice(-maxVisiblePages);
    }

    const type = typeof page;

    const handleClick = (newPage) => {

        setPage(newPage);
        handlePageChange(newPage);

    }

    useEffect(() => {

        // handlePageChange(page);

    }, []);

  return (

    <nav>

        <ul className="pagination">

            { page > 1 && (

                <li>
                    <button onClick={ () => handleClick(page - 1) }>Previous</button>
                </li>

            )}

            { pageNumbers.map((pageNumber) => (

                <li key={ pageNumber } className={ page === pageNumber ? 'active' : '' }>
                    <button onClick={ () => handleClick(pageNumber) }>{ pageNumber }</button>
                </li>

            ))}

            { page < totalPages && (

                <li>
                    <button onClick={ () => handleClick(page + 1) }>Next { page + 1 }</button>
                </li>

            )}

        </ul>
    </nav>

  );
}

export default Pagination