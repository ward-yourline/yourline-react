// SignInPage.js
import React from 'react';
import './SignInPage.css'; // Import your styles

function SignInPage() {
    const path = "file:///Users/warrdadlani/Documents/Projects/Projects/YourLineRepo/YourLine-Web/YourLine-Web/pages/signin/signin.html"
    
    return (
        <div>
            <h2>Sign In</h2>
            <iframe title="Sign In" src={path}></iframe>
        </div>
    );
}

export default SignInPage;
