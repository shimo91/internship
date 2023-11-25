
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './elements/Dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
