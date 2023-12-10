
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
import Marks from './elements/Marks'
import View from './elements/View';
import Topicdetails from './elements/Topicdetails';

import EditDiscussion from './elements/EditDiscussion';
import { DiscussionProvider } from './context/DiscussionContext';
import { RequireStudentDashAuth } from './Components/StudentDashAuth';
import { RequireAuth } from './Components/Auth';


function App() {
  return (
    <div className="App">
      <DiscussionProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Main child = {<Login/>}/>}/>
        <Route path='/report' element={<RequireAuth><Dashboard child={<DataProvider><FinalReport/></DataProvider>} title={'FinalReport'}/></RequireAuth>}/>
        <Route path='/signup' element={<Main child = {<Signup/>}/>}></Route>
        <Route path="/logout" element={<Logout/>}/>
        <Route path='/dashboard' element={<RequireAuth><Dashboard child={<DataProvider><Overview /></DataProvider>} title={'Project Overview'} /></RequireAuth>} />
        <Route path='/reference' element={<RequireAuth><Dashboard child={<DataProvider><Reference /></DataProvider>} title={'Reference Material'} /></RequireAuth>} />
        <Route path='/forum' element={<RequireAuth><Dashboard child={<DataProvider><Forum /></DataProvider>} title={'Discussion Forum'} /></RequireAuth>} />
        <Route path='/discussion' element={<RequireAuth><Dashboard child={<DataProvider><Discussion /></DataProvider>} title={'Discussion Forum'} /></RequireAuth>} />
        <Route path='/viewdiscussion/:id' element={<RequireAuth><Dashboard child={<DataProvider><ViewDiscussion /></DataProvider>} title={'Discussion Forum'} /></RequireAuth>} />
        <Route path="/sdashboard" element={<RequireStudentDashAuth><DataProvider><Studentdashboard /></DataProvider></RequireStudentDashAuth>} />
        <Route path='/week' element={<RequireAuth><Dashboard child={<DataProvider><Week /></DataProvider>} title={'Weekly reports'}/></RequireAuth>}/>
        <Route path='/vivavoce' element={<RequireAuth><Dashboard child={<DataProvider><Vivavoce /></DataProvider>} title={'Viva Voce'}/></RequireAuth>}/>
        <Route path='/marks' element={<RequireAuth><Dashboard child={<DataProvider><Marks /></DataProvider>} title={'Marks'}/></RequireAuth>}/>
        <Route path="/topic/:topicId" element={<RequireAuth><Topicdetails /></RequireAuth>} />
        <Route path='/editdiscussion' element={<RequireAuth><Dashboard child={<DataProvider><EditDiscussion /></DataProvider>} title={'Edit Discussion'} /></RequireAuth>} />

        
      </Routes>
      </DiscussionProvider>
    </div>
  );
}

export default App;
