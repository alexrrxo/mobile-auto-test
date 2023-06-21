import { useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import { useDispatch } from 'react-redux';
import { CryptoTypes } from './store/reducers/crypto.reducer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CryptoTypes.INITIALIZE_APP });
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
