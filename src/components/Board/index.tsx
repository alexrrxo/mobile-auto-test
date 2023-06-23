import IntervalBar from '../IntervalBar';
import Tables from '../Tables';
import Pagination from '../Pagination';
import './Board.css';

const Board = () => {
  return (
    <div className="board">
      <IntervalBar />
      <Tables />
      <Pagination />
    </div>
  );
};

export default Board;
