import React from 'react'
import '../Style/Home.css';
import heroSection from '../assets/HomePics/heroSection.jpg';
import SearchBarH from '../Components/SearchBarHome';
import BestDestinations from '../Components/Destinations/BestDestination';
import TrendingSection from '../Components/Trendings/TrendingSection';
import Reviews from '../Components/Reviews/Reviews';
import Footer from '../Components/Footer';
import HeaderHome from '../Components/Home_Nav_Bar';

const Home = () => {
    return (
        <>
        <div className='Home'>
        <div className='imgBg'>
            <img 
                src={heroSection} 
                alt="Picture"
                className='image'
            />
            </div>
        <div className="sectionText">
            <h2>Helping Others</h2>
            <h1>LIVE & TRAVEL</h1>
            <p>Special offers to suit your plan</p>
        </div>
        <HeaderHome/>
        <SearchBarH/>
        <BestDestinations/>
        <TrendingSection/>
        <Reviews/>
        <Footer/>
        </div></>
    )
}
export default Home