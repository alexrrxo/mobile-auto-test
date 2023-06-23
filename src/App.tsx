import { useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import { initializeApp } from './store/reducers/crypto.reducer';
import { useAppDispatch } from './hooks';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeApp());
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
