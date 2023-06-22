import React, { useEffect } from 'react';
import './Pagination.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { getPageCount, getPagesArray } from '../../helpers/pagination';
import { cutArray } from '../../helpers/localstorage';
import { CryptoTypes } from '../../store/reducers/crypto.reducer';

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalNotes, limit, currentPage, data, pageData } = useSelector(
    (state: IRootState) => state.crypto
  );

  const pagesCount = getPageCount(totalNotes, limit);
  const pagesArray = getPagesArray(pagesCount);

  const setPageHandler = (pageNumber: number) => {
    dispatch<any>({ type: CryptoTypes.SET_PAGE, payload: pageNumber });
    const arr = cutArray(pageNumber, limit, data);

    dispatch<any>({ type: CryptoTypes.SET_PAGE_DATA, payload: arr });
  };

  cutArray();

  useEffect(() => {
    setPageHandler(1);
  }, []);
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
