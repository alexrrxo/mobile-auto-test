import React from 'react';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { getPageCount, getPagesArray } from '../../helpers/pagination';
import { CryptoTypes } from '../../store/reducers/crypto.reducer';

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalNotes, limit, currentPage } = useSelector(
    (state: IRootState) => state.crypto
  );

  const pagesCount = getPageCount(totalNotes, limit);
  const pagesArray = getPagesArray(pagesCount);

  const setPage = (page: number) => {
    dispatch({ type: CryptoTypes.SET_PAGE, payload: page });
  };
  return (
    <div className="pagination">
      {pagesArray.map((page) => (
        <button
          onClick={() => setPage(page)}
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
