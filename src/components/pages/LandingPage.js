// LandingPage.js
import React from 'react';
import './LandingPage.css';
import YLLegacyPath from '../helper/YLLegacy';

function LandingPage() {    
    return (
        <div>
            <iframe title="Landing page" src={YLLegacyPath("pages/businesses/business-landing-page/business-landing-page.html")}></iframe>
        </div>
    );
}

export default LandingPage;