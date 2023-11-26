
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './elements/Dashboard';
import Reference from './elements/Reference';
import Overview from './elements/Overview';
import Login from './elements/Login';
import Home from './elements/Home';
import Signup from './elements/Signup';
import Forum from './elements/Forum';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard child={<Overview />} title={'Project Overview'}/>}/>
        <Route path='/reference' element={<Dashboard child={<Reference />} title={'Reference Material'}/>}/>
        <Route path='/forum' element={<Dashboard child={<Forum />} title={'Discussion Forum'}/>}/>
      </Routes>
    </div>
  );
}

export default App;
