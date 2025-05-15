import React from "react";
import GettingStartNav from "../Components/Getting_Started/GettingStartNav";
import LoginForm from "../Components/Login/LoginForm";
import GettingStartFooter from "../Components/Getting_Started/GettingStartedFooter";
const LoginPage = () => {
    return (

<>
<GettingStartNav/>
<LoginForm/>
<div className="border-t border-gray-700"></div>

<GettingStartFooter/>
</>
    )
}

export default LoginPage;