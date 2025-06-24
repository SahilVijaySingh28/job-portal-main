import React from 'react';
import LoginPageNavbar from '../components/LoginPageNavbar';
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
function LandingPage() {
    return (
        <>
            <LoginPageNavbar />
            <div className='flex ml-65 mt-20'>
                <LeftSection />
                <RightSection />
            </div>
        </>
    );
}
export default LandingPage;
