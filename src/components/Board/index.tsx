import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import './Board.css';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/reducers/crypto.reducer';
import { useAppDispatch } from '../../hooks';

const Board = () => {
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(addData());
  };
  return (
    <div className="board">
      <IntervalBar />
      <Tables />
      <Pagination />

      <button onClick={clickHandler}>send</button>
    </div>
  );
};

export default Board;
