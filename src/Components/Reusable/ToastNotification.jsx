// ToastNotification.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reusable ToastNotification Component
const ToastNotification = () => {
    return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
        toastStyle={{
          borderRadius: "10px",
          fontSize: "16px",
          padding: "16px",
        }}
      />
    </div>
  );
};

export default ToastNotification;
