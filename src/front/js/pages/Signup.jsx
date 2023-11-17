import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const navigate = useNavigate();

    const signup = async () => {
        const url = process.env.BACKEND_URL + '/api/signup';
        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(options, url)
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                console.log("esta es la data del signup", data);
                navigate('/login');
            } else {
                console.log('Error: ', response.status, response.statusText);
            }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight: '610px'}}>
            <form style={{ width: "400px" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" value={email} onChange={handleEmail}
                           className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escribe tu email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password" value={password} onChange={handlePassword}
                           className="form-control" id="exampleInputPassword1" placeholder="Escribe tu contraseña" />
                </div>
                <div className="mt-4" style={{ display: 'flex', justifyContent: 'space-between'}}>
                    <button type="button" onClick={signup} className="btn btn-warning fw-bold text-dark">Sign up</button>
                </div>
            </form >
        </div >
    );
};