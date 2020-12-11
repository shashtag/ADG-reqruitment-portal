import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Background from "../../hoc/Background/Background";

import LoginModule from "./Login.module.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const handleSubmit = function() {
        document.getElementById("adminLogin").addEventListener("submit", async function(e) {
            e.preventDefault();
            const user = { email, password };
            fetch('https://adgrecruitments.herokuapp.com/admin/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })
            .then(function (response) {
                // console.log(response);
                // console.log(response.message);
                // return response.json();
                if(response.status === 200)
                    return response.json();
                else
                    throw Error(response.statusText);
            })
            .then(function(data) {
                console.log("Success: ", data);
                console.log(data.Token);
                sessionStorage.setItem("admin", JSON.stringify(data.Token));
                history.push("/admin");
            }).catch(error => {
                console.log("Invalid Login Credentials ", error);
                alert("Invalid Login Credentials!");
            })
        })
    }

    return(
        <Background>
            <div>
                <h2>Admin Login</h2>
                <form method="post" id="adminLogin">
                    <label htmlFor="email" className={ LoginModule.label }>E-mail</label> <br />
                    <input type="email"
                           name="email"
                           placeholder="Enter E-mail ID"
                           value={ email }
                           className={ LoginModule.input }
                           onChange={ (e) => setEmail(e.target.value) } /> <br />
                    <label htmlFor="password" className={ LoginModule.label }>Password</label> <br />
                    <input type="password"
                           name="password"
                           placeholder="Enter Password"
                           value={ password }
                           className={ LoginModule.input }
                           onChange={ (e) => setPassword(e.target.value) } /> <br />
                    <button type="submit"
                            className={ LoginModule.button }
                            onClick={ handleSubmit }>
                                LOGIN
                    </button>
                </form>
            </div>
        </Background>
    )
}

export default Login;
