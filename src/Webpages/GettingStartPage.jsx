import React from "react";
import GetNav from "../Components/Getting_Started/GettingStartNav";
import GetForm from "../Components/Getting_Started/GettingStartForm";
import Footer from "../Components/Landing/Footersection";
import Footersection from "../Components/Landing/Footersection";
const GettingStartPage = () => {
    return(
    <>
    <GetNav/>
    <div className="text-center pt-25 bg-gray-900">
  <h1 className="text-3xl font-bold text-amber-300">
    REGISTER YOUR INSTITUTION
  </h1>
  <p className="text-gray-400 mt-2 text-sm">
    'Get your institute ID & start using Adhyanam to Manage students, track progress, and streamline education with ease..'
  </p>

 
</div>
<div>
    <p className=" pt-15 pl-5 bg-gray-900 text-l text-amber-200">
        *Please fill out this form to get started with Adhyanam. We will contact you shortly with your institution ID and further instructions.
    </p>
    <p className="pl-5  bg-gray-900 text-l text-amber-200">
       Note : The fields marked with * are mandatory.
    </p>
</div>
<GetForm/>
<Footersection/>

  
    </>
    );
};
export default GettingStartPage;