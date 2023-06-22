import React, { useEffect } from 'react';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { getPageCount, getPagesArray } from '../../helpers/pagination';
import { setPage } from '../../store/reducers/crypto.reducer';

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalNotes, limit, currentPage, data } = useSelector(
    (state: IRootState) => state.crypto
  );

  const pagesCount = getPageCount(totalNotes, limit);
  const pagesArray = getPagesArray(pagesCount);

  const setPageHandler = (pageNumber: number) => {
    dispatch<any>(setPage(pageNumber, limit, data));
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
