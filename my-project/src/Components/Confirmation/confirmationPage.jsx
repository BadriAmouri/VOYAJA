import React from 'react';
import Header from '../NavBar'; 

import FileUploadForm from './FileUploadForm.jsx';

import Footer from '../Footer';
import '../../Style/upload.css'

const ConfirmationPage = () => {
  return (
    <div className="confirmation-page">
      
      <Header/>
    
      <main>
        {/* First Row: Flight details and Price breakdown */}
        <div className="upload_files">
        <FileUploadForm/> 
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
