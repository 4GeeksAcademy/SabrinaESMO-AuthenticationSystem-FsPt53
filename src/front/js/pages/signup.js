import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        actions.signup(email, password);
    };

    if(store.users && store.users != "" && store.users != undefined) navigate("/login");

    return (
        <div className="text-center mt-5">
            <h1>SIGNUP</h1>
            {(store.users && store.users != "" && store.users != undefined) ? "You are already logged in as" + store.user :
            <div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Signup</button>
            </div>
            }
        </div>
    );
};
