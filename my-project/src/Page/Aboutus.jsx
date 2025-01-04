import React from 'react'
import '../Style/aboutus.css';
import heroSection from '../assets/AboutusPics/aboutushero.png';
import Footer from '../Components/Footer';
import NavigationBar from '../Components/NavigationBar/navigationBar';
import { useAppContext } from '../contexts/AppContext';
import VisionMissionTagline from '../Components/Aboutus/VisionMissionTagline';
import OurValues from '../Components/Aboutus/OurValues';
import KeyFeatures from '../Components/Aboutus/KeyFeatures';
const Aboutus = () => {
    const {isLoggedIn, setIsLoggedIn ,clientID ,setClientID} = useAppContext();
    console.log("are you logged IN badri",isLoggedIn)
    return (
        <>
        <div className='Aboutus'>
        <div className='imgBg'>
            <img 
                src={heroSection} 
                alt="Picture"
                className='imageaboutus'
            />
            </div>
        <div className="sectionTextaboutus">
            <h2>About us</h2>
            <h1>Voyaja: Your Gateway to Discover Algeria, Seamlessly.</h1>
            <p>Special offers to suit your plan</p>
        </div>
        <NavigationBar isHome={true}/>
        {/* Vision, Mission, and Tagline Section */}
        <VisionMissionTagline />
        {/* Our Values Section */}
        <OurValues />
        {/* Key Features */}
        <KeyFeatures />

        <Footer/>
        </div></>
    )
}
export default Aboutus