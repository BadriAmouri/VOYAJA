import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";


const AgencyCard = ({ logo, name, location, email, phone, socialMedia }) => {
  return (
    
    <div className="agencycardcompo bg-teal-100 rounded-lg shadow-md p-6 mx-4 my-4 flex  items-center max-w-[74rem]">
      {/* Logo Section */}
      <div className="agencycardcompo-photo flex-shrink-0">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-30 h-30 rounded-full object-cover"
        />
      </div>

    <div className="agencycardcompo-info flex flex-col  items-start ml-10">

      {/* Info Section */}
      <div className="ml-6 flex-grow">
        <h2 className="text-xl font-bold text-teal-800">{name}</h2>
        <p className="text-teal-700 mt-1"><span className="text-teal-500">Location: </span> {location}</p>
        <p className="text-teal-700"><span className="text-teal-500">Email: </span>  {email}</p>
        <p className="text-teal-700"><span className="text-teal-500">Phone: </span>{phone}</p>
      </div>

      {/* Social Media Icons */}
      <div className="flex ml-5 mt-3 space-x-4">
        {socialMedia.map((media, index) => (
          <a
            key={index}
            href={media.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-800 hover:text-teal-600"
          >
            <FontAwesomeIcon icon={media.icon} style={{ fontSize: "1.5em" }} />
          </a>
        ))}
      </div>
      </div>
    </div>
   
  );
};

export default AgencyCard;
