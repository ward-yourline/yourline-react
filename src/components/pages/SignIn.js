import React, { useState, useEffect } from 'react';
import { queryFetch } from '../../webService/WebService';
import Separator from '../layout/Separator';
import InputTextField, { InputTextFieldImage, InputTextFieldType } from '../text/InputTextField';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import { storeUser } from '../../dataService/DataService';
import { validateEmail } from '../../utilities/utilities'

const SignInPage = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const abortController = new AbortController();
    const navigate = useNavigate();

    function didSignInUser(id, accessToken, refreshToken) {
     
        storeUser(id, accessToken, refreshToken)

        navigate('/landing');
    }
    
    const signInQuery = `
      query signIn($input: UserSignInInput!) {
        signIn(input: $input) {
          id
          accessToken
          refreshToken
        }
      }
    `;

    useEffect(() => {
        const queryVariables = {
            input: {
                email,
                password,
            },
        };

        const query = signInQuery;

        queryFetch(query, queryVariables)
            .then((data) => {
                setApiResponse(data);

                if (data && data.data.signIn) {
                    const { accessToken, id, refreshToken } = data.data.signIn;
                    console.log(id, accessToken, refreshToken)
                    didSignInUser(id, accessToken, refreshToken)
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
                <div>
                    <img className='logo' src="../../assets/yl_vertical_logo.svg" alt="" />
                </div>

                <Separator />

                <h3>Sign in</h3>
                <div className="form">
                    <InputTextField image={InputTextFieldImage.person} type={InputTextFieldType.email} placeholder={"Enter email"} id={"email"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.lock} type={InputTextFieldType.password} placeholder={"Enter password"} id={"password"} />
                    <br />

                    <div className="options">
                        <div className="remember-me">
                            <input className="remember-me" type="checkbox" />
                            <label htmlFor="remember-me"> Remember me</label>
                        </div>

                        <div className="forgot-password">
                            <Link to="forgot">Forgot password</Link>
                        </div>
                    </div>

                    <div className="sign-up">
                        <button className='sign-in-btn' onClick={didTapSignIn}>Sign in</button>
                    </div>

                    <Separator />

                    <div className="sign-up">
                        <Link to="signup">New to YourLine? Sign up here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
