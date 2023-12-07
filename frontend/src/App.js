
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Reference from './elements/Reference';
import Overview from './elements/Overview';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Forum from './elements/Forum';
import Discussion from './elements/Discussion';
import ViewDiscussion from './elements/ViewDiscussion';
import Main from './Components/Main';
import { Logout } from './elements/Logout';
import Studentdashboard from './elements/Studentdashboard';
import { DataProvider } from './context/DataContext';
import Week from './elements/Week';
import View from './elements/View';
import Topicdetails from './elements/Topicdetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        {/* <Route path='/login' element={<Login/>}></Route> */}
        <Route path='/login' element={<Main child = {<Login/>}/>}/>
       
        <Route path='/signup' element={<Main child = {<Signup/>}/>}></Route>
        <Route path='/dashboard' element={<Dashboard child={<Overview />} title={'Project Overview'}/>}/>
        <Route path='/reference' element={<Dashboard child={<Reference />} title={'Reference Material'}/>}/>
        <Route path='/forum' element={<Dashboard child={<DataProvider><Forum /></DataProvider>} title={'Discussion Forum'}/>}/>
        <Route path='/discussion' element={<Dashboard child={<DataProvider><Discussion /></DataProvider>} title={'Discussion Forum'}/>}/>
        <Route path='/viewdiscussion/:id' element={<Dashboard child={<DataProvider><ViewDiscussion /></DataProvider>} title={'Discussion Forum'}/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/sdashboard" element={<Studentdashboard />} />
        <Route path='/week' element={<Dashboard child={<Week />} title={'Weekly reports'}/>}/>
        <Route path="/topic/:topicId" element={<Topicdetails />} />

        
      </Routes>
    </div>
  );
}

export default App;
