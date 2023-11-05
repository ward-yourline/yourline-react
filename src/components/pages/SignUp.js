import React, { useState, useEffect } from 'react';
import { queryFetch } from '../../webService/WebService';
import Separator from '../layout/Separator';
import InputTextField, { InputTextFieldImage, InputTextFieldType } from '../text/InputTextField';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import { storeUser } from '../../dataService/DataService';
import { validateEmail } from '../../utilities/utilities'
import "./SignUp.css";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const SignUp = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const abortController = new AbortController();
    const navigate = useNavigate();

    function didTapSignUp(id, accessToken, refreshToken) {

        storeUser(id, accessToken, refreshToken)

        navigate('/landing');
    }

    function showPassword() {
        // TODO
    }

    const signUpMutation = `
    mutation signUp($input: UserSignUpInput!) {
            signUp(input: $input) {
                id
                accessToken
                refreshToken
         }
    }`

    useEffect(() => {
        const queryVariables = {
            input: {
                email,
                password,
            },
        };

        queryFetch(signUpMutation, queryVariables)
            .then((data) => {
                setApiResponse(data);

                if (data && data.data.signUp) {
                    const { accessToken, id, refreshToken } = data.data.signUp;
                    console.log(id, accessToken, refreshToken)
                    didTapSignUp(id, accessToken, refreshToken)
                }

                return () => {
                    abortController.abort();
                }
            })
            .catch((error) => {
                // Handle the error as needed
                console.error('Sign in failed:', error);
            });
    }, [email, password]);

    const didTapSignIn = () => {
        const email = document.querySelector('.email').value
        const password = document.querySelector('.password').value

        if (email.length == 0 || !validateEmail(email)) {
            return (
                alert("Please enter a valid email.")
            )
        }

        if (password.length < 3) {
            return (
                alert("Please enter a password at least 8 characters long.")
            )
        }

        setEmail(email);
        setPassword(password);
    };

    return (
        <div className="login-div">
            <div>
                <div className="logo-container">
                    <img className="logo" src="assets/yl_vertical_logo.svg" alt="YourLine Logo" />
                </div>

                <Separator />

                <h3>Sign up</h3>
                <div className="form">
                    <InputTextField image={InputTextFieldImage.person} type={InputTextFieldType.text} placeholder={"First name"} id={"first-name"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.person} type={InputTextFieldType.text} placeholder={"Surname"} id={"surname"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.mail} type={InputTextFieldType.email} placeholder={"Email"} id={"email"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.person} type={InputTextFieldType.text} placeholder={"Username"} id={"username"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.lock} type={InputTextFieldType.password} placeholder={"Password"} id={"password"} />
                    <div class="checkbox-div">
                        <label>
                            <input type="checkbox" onClick={showPassword} /> Show password
                            <p id="caps-warning">Caps lock is ON.</p>

                        </label>
                    </div>
                    <br />
                    <InputTextField image={InputTextFieldImage.home} type={InputTextFieldType.text} placeholder={"Home address"} id={"address"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.home} type={InputTextFieldType.text} placeholder={"Postcode/Zipcode"} id={"post_code"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.phone} type={InputTextFieldType.email} placeholder={"Mobile/Cell number"} id={"mobile"} />
                    <br />

                    <div className="sign-up">
                        <button className='sign-up-btn' onClick={didTapSignUp}>Sign up</button>
                    </div>

                    <Separator />

                    <div className="sign-in">
                        <Link to="signin">Already a member? Sign in here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;