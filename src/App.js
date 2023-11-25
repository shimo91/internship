
import { Route, Routes } from 'react-router-dom/dist';
import './App.css';
import Dashboard from './Dashboard';



function App() {
  return (
    <div>
    <Routes>
  <Route path="/" element={<Dashboard />} />
  

</Routes>


     
    
    </div>
  );
}

export default App;
