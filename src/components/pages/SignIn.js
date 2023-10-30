// SignInPage.js
import React from 'react';
import './SignIn.css'; // Import your styles
import Separator from '../layout/Separator';
import InputTextField, { InputTextFieldImage, InputTextFieldType } from '../text/InputTextField';
import YLLegacyPath from '../helper/YLLegacy';
import { Link } from 'react-router-dom';

function SignInPage() {
    return (
        <div class="login-div">
            <div>
                <div class="title">
                    <img className='logo' src="../../assets/yl_vertical_logo.svg" alt="" />
                </div>

                <Separator />

                <h3>Sign in</h3>
                <div class="form">
                    <InputTextField image={InputTextFieldImage.person} type={InputTextFieldType.email} placeholder={"Enter email"} />
                    <br />
                    <InputTextField image={InputTextFieldImage.lock} type={InputTextFieldType.password} placeholder={"Enter password"} />
                    <br />

                    <div class="options">
                        <div class="remember-me">
                            <input className="remember-me" type="checkbox" />
                            <label for="remember-me"> Remember me</label>
                        </div>

                        <div class="forgot-password">
                            <Link to="forgot">Forgot password</Link>
                        </div>
                    </div>

                    <div class="sign-up">
                        <Link to="landing" className='sign-in-btn'>Sign in</Link>
                    </div>

                    <Separator />

                    <div class="sign-up">
                        <Link to="signup" >New to YourLine? Sign up here</Link>
                    </div>

                    {/* <button onclick="signInTapped()" class="sign-in-btn">Sign in</button>

            <hr class="rounded" />

            <button class="sign-in-google-btn">
                <img width="15px" style="margin-bottom: -1px; margin-right: 8px" alt="Google login"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Sign in with Google
            </button>

            <div class="sign-up">
                <a href="../signup/signup.html">New to YourLine? Sign up here </a>
            </div>  */}
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
