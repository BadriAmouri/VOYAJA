import React from 'react';
import Header from '../NavBar'; 

import FileUploadForm from './FileUploadForm.jsx';

import Footer from '../Footer';
import '../../Style/upload.css'
import NavigationBar from '../NavigationBar/navigationBar.jsx';

const ConfirmationPage = () => {
  return (
    <div className="confirmation-page">
       <NavigationBar isLoggedIn={true}></NavigationBar>

    
      <main>
      
        {/* First Row: Flight details and Price breakdown */}
        <div className="upload_files_reciept">
        <FileUploadForm/> 
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
