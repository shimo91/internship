import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const RequireStudentDashAuth = ({children})=>{
    
    const getToken=sessionStorage.getItem('userToken');
    
    //console.log('token: '+getToken);
    const location=useLocation();
    if(!getToken)
    {
        return <Navigate to='/' state={{from:location}}/>
    }
    else 
    {
        const decodeToken =jwtDecode(getToken);
        const topicSelected=decodeToken.topicstatus
        if(topicSelected==true)
        {
            return <Navigate to='/' state={{from:location}}/>
        }
        
    }
    return children;
}