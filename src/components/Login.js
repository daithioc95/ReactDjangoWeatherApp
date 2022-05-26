import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function Login({ setToken, setUser, setMessage }){
    
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    
    const handleLoginSubmit = e => {
        const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";
        e.preventDefault();
        
        const loginData = {
            'username': username,
            'password': password
        }
        
        axios.post(`${API_ENDPOINT}dj-rest-auth/login/`, loginData)
        .then(res => {
            let authToken = localStorage.setItem('token', res.data.key);
            setToken(authToken)

            let authUser = localStorage.setItem('user', username);
            setToken(authUser)

            console.log(`
                ${authToken}
                ${username}`
                );
        setMessage("Logged in");
    })
    .catch(err => {
        console.log(err);
        setMessage("Invalid");
    });

    }
    return(
        <form onSubmit={handleLoginSubmit}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    )
}

export default Login