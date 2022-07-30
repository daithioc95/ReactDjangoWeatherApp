import React from "react";
import { useHistory } from "react-router-dom";

const Logout = ({ setToken, setUser, setMessage }) => {
    const history = useHistory();

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser('');
        setMessage('You are logged out');
        history.push("/");
        // localStorage.setItem('LoginStatus', false);
        // setStatus(false)
        // setLoginStatus(false);
    }

    return(
        <>
            <button onClick={handleLogoutClick}>
                <div className="navItem scaled">
                    logout
                </div>
            </button>
        </>
    )
}

export default Logout