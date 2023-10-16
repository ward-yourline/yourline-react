// SignInPage.js
import React from 'react';
import './SignInPage.css'; // Import your styles
import YLLegacyPath from '../helper/YLLegacy';

function SignInPage() {    
    return (
        <div>
            <h2>Sign In</h2>
            <iframe title="Sign In" src={YLLegacyPath("pages/signin/signin.html")}></iframe>
        </div>
    );
}

export default SignInPage;
