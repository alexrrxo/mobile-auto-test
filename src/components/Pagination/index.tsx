import React, { useEffect } from 'react';
import './Pagination.css';
import { getPagesCount, getPagesArray } from '../../helpers/pagination';
import { setPage } from '../../store/reducers/crypto.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { totalNotes, limit, currentPage } = useAppSelector(
    (state) => state.crypto
  );

  const pagesCount = getPagesCount(totalNotes, limit);
  const pagesArray = getPagesArray(pagesCount);

  const setPageHandler = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="pagination">
      {pagesArray.map((page) => (
        <button
          onClick={() => setPageHandler(page)}
          className={currentPage === page ? 'currentPage' : ''}
          key={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
