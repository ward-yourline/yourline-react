import React from 'react';
import './HomePage.css'; // Import your styles
import Separator from '../layout/Separator';
import Padding from '../layout/Padding';
import TextLabel, { TextLabelType, TextLabelAlignment } from '../text/TextLabel';
import { Link } from 'react-router-dom'; // Import Link from React Router
import YLLegacyPath from '../helper/YLLegacy';

const HomePage = () => {

    const signInTapped = () => {
        // Implement your navigation logic here, e.g., using React Router.
        window.location.href = YLLegacyPath("pages/signin/signin.html")
    };

    const signUpTapped = () => {
        // Implement your navigation logic here, e.g., using React Router.
        window.location.href = YLLegacyPath("pages/signup/signup.html")
    };

    return (
        <div>
            <div className="logo-container">
                <img className="logo" src="assets/yl_vertical_logo.svg" alt="YourLine Logo" />
            </div>
            <Separator />
            <br />

            <div className="section-container">
                <Padding flex={3} />
                <div className="button-container">
                    <button onClick={signInTapped} className="sign-in-btn">
                        Sign in
                    </button>
                    <button onClick={signUpTapped} className="sign-in-btn">
                        Sign up
                    </button>
                </div>
                <Padding flex={3} />
            </div>
            <div className="section-container">
                <Padding flex={1} />
                <div className='content-container' style={{ flex: 2 }}>
                    <TextLabel type={TextLabelType.h3} alignment={TextLabelAlignment.center} text="Empowering Global Connectivity: YourLine's Seamless Solution" />
                    <TextLabel type={TextLabelType.p} fontSize="18px" alignment={TextLabelAlignment.center} text="In a world where connections matter more than ever, YourLine simplifies life's complexities.
                        Our revolutionary platform streamlines online experiences for individuals, businesses, and communities.
                        From personal networks to seamless business interactions, YourLine bridges gaps and empowers connections." />
                </div>
                <Padding flex={1} />
            </div>
            <br></br>
            <div className='beta-div'>
                <mark><strong>BETA</strong>
                </mark>
            </div>
            <div className='beta-div'>
                <p>
                    This is a <em><mark>BETA</mark></em> build of the business module. You will be able to build a business for products and services, or be a customer, or both.
                </p>
                <p>
                    <em>We are constantly improving the service but please be aware that there may still be bugs in the system.</em>
                </p>
                <p>
                    If you have any queries, or would like to report any bugs, send an email <a href="mailto:ward.yourline@gmail.com?subject = Feedback">here</a>
                </p>
            </div>
        </div>
    );
};

export default HomePage;
