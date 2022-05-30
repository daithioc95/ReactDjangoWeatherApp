import React from "react";

const Logout = ({ setToken, setUser, setMessage }) => {
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser('')
        setMessage('You are logged out')
        // localStorage.setItem('LoginStatus', false);
        // setStatus(false)
        // setLoginStatus(false);
    }

    return(
        <>
            <button onClick={handleLogoutClick}>logout</button>
        </>
    )
}

export default Logout