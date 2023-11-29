
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Reference from './elements/Reference';
import Overview from './elements/Overview';
import Login from './elements/Login';
import Home from './elements/Home';
import Signup from './elements/Signup';
import Forum from './elements/Forum';
import Discussion from './elements/Discussion';
import ViewDiscussion from './elements/ViewDiscussion';


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
        <Route path='/discussion' element={<Dashboard child={<Discussion />} title={'Discussion Forum'}/>}/>
        <Route path='/viewdiscussion' element={<Dashboard child={<ViewDiscussion />} title={'Discussion Forum'}/>}/>
      </Routes>
    </div>
  );
}

export default App;
