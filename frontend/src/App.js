
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './elements/Dashboard';
import Reference from './elements/Reference';
import Overview from './elements/Overview';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/dashboard' element={<Dashboard child={<Overview />} title={'Project Overview'}/>}/>
        <Route path='/reference' element={<Dashboard child={<Reference />} title={'Reference Material'}/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
