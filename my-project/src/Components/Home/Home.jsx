import React from 'react'
import '../../Style/Home.css'
import heroSection from '../../assets/HomePics/heroSection.jpg';
import SearchBar from '../SearchBarHome';
import BestDestinations from '../Destinations/BestDestination';
import TrendingSection from '../Trendings/TrendingSection';
import Reviews from '../Reviews/Reviews';
import Footer from '../Footer';
import Header from '../Home_Nav_Bar';

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
        <SearchBar/>
        <BestDestinations/>
        <TrendingSection/>
        <Reviews/>
        </div></>
    )
}
export default Home