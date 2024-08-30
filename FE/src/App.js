import './App.css';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
