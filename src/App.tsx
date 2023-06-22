import { useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import { useDispatch } from 'react-redux';
import { initializeApp } from './store/reducers/crypto.reducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(initializeApp());
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Board />
      </div>
    </div>
  );
}

export default App;
