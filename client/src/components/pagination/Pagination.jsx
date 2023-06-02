import React from 'react';
import styles from '../pagination/pagination.module.css';

const Pagination = ({ onPageChange, currentPage, totalPages }) => {
  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${styles.pageItem} ${i === currentPage ? styles.active : ''}`}
        >
          <button className="page-link" onClick={() => onPageChange(i)}  style={{ backgroundColor: 'brown', color: 'white' }}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className={`pagination justify-content-center ${styles.pagination}`}>
        <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ''}`}>
          <button className="page-link" onClick={handlePreviousPage} style={{ backgroundColor: 'brown', color: 'white' }}>
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li
          className={`${styles.pageItem} ${
            currentPage === totalPages ? styles.disabled : ''
          }`}
        >
          <button className="page-link" onClick={handleNextPage} style={{ backgroundColor: 'brown', color: 'white' }}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;