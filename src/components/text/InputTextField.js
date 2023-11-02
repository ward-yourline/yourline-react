import React from "react";
import './InputTextField.css';

export const InputTextFieldImage = {
    person: "../../assets/person_FILL0_wght400_GRAD0_opsz48.svg",
    lock: "../../assets/lock_FILL0_wght400_GRAD0_opsz48.svg"
}

export const InputTextFieldType = {
    email: "email",
    password: "password"
}

const InputTextField = ({ image, type, placeholder, id }) => {

    const concactenatedID = "user-input" + " " + id
    
    return (
        <div className="input-div">
            <img className="input-images" src={image} alt="" />
            <input className={concactenatedID} type={type} placeholder={placeholder} />
        </div>
    );
}

export default InputTextField;