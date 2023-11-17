import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const navigate = useNavigate();

    const login = async () => {
        
        const url = process.env.BACKEND_URL + '/api/login';
        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            //store.user = data.results;
            actions.setUser(data);
            console.log("aqui va la data ", data)   
            navigate("/protected")         
        } else {
            if (response.status == 404) {
                const error = await response.text();
                
            }
            console.log('Error: ', response.status, response.statusText);
            /* tratar el error */
            return { error: 'error en el response', status: response.status, statusText: response.statusText }
        }
    }
    return (
        <div className="">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email </label>
                    <input type="email" value={email} onChange={handleEmail}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escribe tu email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                    <input type="password" value={password} onChange={handlePassword}
                        className="form-control" id="exampleInputPassword1" placeholder="Escribe tu contraseña" />
                        </div>
                    <button type="button" className="btn btn-primary" onClick={login}> Login </button>
            </form>
        </div>
    )
}
