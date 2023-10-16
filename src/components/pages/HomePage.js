import React from 'react';
import './HomePage.css'; // Import your styles
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
                <img className="logo" src="/assets/yl_vertical_logo.svg" alt="YourLine Logo" />
            </div>
            <hr className="nav-separator" />

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
                        From persoTextLabelnal networks to seamless business interactions, YourLine bridges gaps and empowers connections." />
                </div>
                <Padding flex={1} />
            </div>
        </div>
    );
};

export default HomePage;
