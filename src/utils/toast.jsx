// src/utils/toast.js
import { toast } from "react-toastify";

export const notify = (message, type = "success") => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message, {
      className: "bg-red-600 text-white font-semibold",
      style: {
        borderRadius: "10px",
        padding: "16px",
      },
    });
  } else {
    toast.info(message);
  }
};
