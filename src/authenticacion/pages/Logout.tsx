import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from '../context/AuthContext.js'

function Logout() {
    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/loadlanding');
        }
    }, [isAuthenticated, navigate])
    
    return <div><h1>Logout</h1></div>;
}

export default Logout;