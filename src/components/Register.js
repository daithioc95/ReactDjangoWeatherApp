import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

function Register({ setToken, setUser, setMessage }){
    const history = useHistory();

    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[email, setEmail] = useState('')
    
    const handleRegisterSubmit = e => {
        const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://react-django-weather-app.herokuapp.com/";
        e.preventDefault();
        
        const RegisterData = {
            'email': email,
            'username': username,
            'password1': password,
            'password2': password
        }
        
        axios.post(`${API_ENDPOINT}dj-rest-auth/registration/`, RegisterData)
        .then(res => {
            let authToken = localStorage.setItem('token', res.data.key);
            setToken(authToken)

            let authUser = localStorage.setItem('user', username);
            setUser(authUser)

            console.log(`
                ${authToken}
                ${username}
                ${email}`
                );
        history.push("/");
        setMessage(`Registered as ${username}`);
    })
    .catch(err => {
        console.log(err);
        setMessage("Invalid");
    });

    }
    return(
        <div className='container'>
            <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputUser1">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="exampleInputUser1" aria-describedby="emailHelp" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Register