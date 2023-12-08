
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Reference from './elements/Reference';
import Overview from './elements/Overview';
import Login from './Components/Login';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Forum from './elements/Forum';
import FinalReport from './elements/FinalReport';
import Discussion from './elements/Discussion';
import ViewDiscussion from './elements/ViewDiscussion';
import Main from './Components/Main';
import { Logout } from './elements/Logout';
import Studentdashboard from './elements/Studentdashboard';
import { DataProvider } from './context/DataContext';
import Week from './elements/Week';
import Vivavoce from './elements/Vivavoce';
import View from './elements/View';
import Topicdetails from './elements/Topicdetails';

import EditDiscussion from './elements/EditDiscussion';
import { DiscussionProvider } from './context/DiscussionContext';


function App() {
  return (
    <div className="App">
      <DiscussionProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Main child = {<Login/>}/>}/>
        <Route path='/report' element={<Dashboard child={<DataProvider><FinalReport/></DataProvider>} title={'FinalReport'}/>}/>
        <Route path='/signup' element={<Main child = {<Signup/>}/>}></Route>
        <Route path="/logout" element={<Logout/>}/>
        <Route path='/dashboard' element={<Dashboard child={<DataProvider><Overview /></DataProvider>} title={'Project Overview'} />} />
        <Route path='/reference' element={<Dashboard child={<DataProvider><Reference /></DataProvider>} title={'Reference Material'} />} />
        <Route path='/forum' element={<Dashboard child={<DataProvider><Forum /></DataProvider>} title={'Discussion Forum'} />} />
        <Route path='/discussion' element={<Dashboard child={<DataProvider><Discussion /></DataProvider>} title={'Discussion Forum'} />} />
        <Route path='/viewdiscussion/:id' element={<Dashboard child={<DataProvider><ViewDiscussion /></DataProvider>} title={'Discussion Forum'} />} />
        <Route path="/sdashboard" element={<DataProvider><Studentdashboard /></DataProvider>} />
        <Route path='/week' element={<Dashboard child={<DataProvider><Week /></DataProvider>} title={'Weekly reports'}/>}/>
        <Route path='/vivavoce' element={<Dashboard child={<DataProvider><Vivavoce /></DataProvider>} title={'Viva Voce'}/>}/>
        <Route path="/topic/:topicId" element={<Topicdetails />} />
        <Route path='/editdiscussion' element={<Dashboard child={<DataProvider><EditDiscussion /></DataProvider>} title={'Edit Discussion'} />} />

        
      </Routes>
      </DiscussionProvider>
    </div>
  );
}

export default App;
