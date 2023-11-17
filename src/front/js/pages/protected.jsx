import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js"
import { useNavigate } from "react-router-dom";

export const Protected = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    //console.log(store.user.access_token)
    const [pass, setPass] = useState(false);
    

    const gateway = async () => {        
        const url = process.env.BACKEND_URL + '/api/protected';
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ store.user.access_token
            }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            console.log("Validation ok", data);
            setPass(true);            
        } else {
            console.log('Error: ', response.status, response.statusText);
            navigate('/login');
        }
    }

    const logout = () => {
        actions.deleteToken();
        navigate('/login')    
    }

    return( 
        <div> <button type="button" className="btn btn-primary" onClick={gateway}> Click para continuar </button>
            {pass?<div><h1>BIENVENIDO, estás logeado</h1> <button type="button" className="btn btn-primary" onClick={logout}> Logout </button></div>: <h1> Haz click para verificar el login </h1> }
         </div>
       
    );
};

