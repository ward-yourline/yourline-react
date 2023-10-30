// SignInPage.js
import React from 'react';
import './SignIn.css'; // Import your styles
import Separator from '../layout/Separator';
import InputTextField, { InputTextFieldImage, InputTextFieldType } from '../text/InputTextField';
import YLLegacyPath from '../helper/YLLegacy';
import { Link } from 'react-router-dom';

function SignInPage() {

    const didTapSignIn = () => {
        console.log('sign in tapped')
    }

    return (
        <div className="login-div">
            <div>
                <div>
                    <img className='logo' src="../../assets/yl_vertical_logo.svg" alt="" />
                </div>

                <Separator />

                <h3>Sign in</h3>
                <div className="form">
                    <InputTextField image={InputTextFieldImage.person} type={InputTextFieldType.email} placeholder={"Enter email"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.lock} type={InputTextFieldType.password} placeholder={"Enter password"} />
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
                        <Link to="signup" >New to YourLine? Sign up here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
