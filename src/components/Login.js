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
            setUser(authUser)

            console.log(`
                ${authToken}
                ${username}`
                );
        setMessage(`Logged in as ${username}`);
        // setLoginStatus(true);
    })
    .catch(err => {
        console.log(err);
        setMessage("Invalid");
    });

    }
    return(
        <div className='container'>
            <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login