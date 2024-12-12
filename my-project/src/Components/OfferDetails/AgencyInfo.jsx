const AgencyInfo = ({
  agencyName,
  agencyLogo,
  agencyLocation,
  agencyPhone,
  agencySocials,
}) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-sm rounded-lg border border-customBorder">
      <div className="flex items-center mb-4">
        <img
          src={agencyLogo}
          alt="Agency Logo"
          className="w-16 h-16 rounded-full"
        />
        <h2 className="text-lg font-bold ml-4">{agencyName}</h2>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="space-y-2">
        <div className="flex items-start">
          <span className="material-icons text-gray-600">location_on</span>
          <p className="ml-2 text-sm text-gray-700">{agencyLocation}</p>
        </div>
        <div className="flex items-center">
          <span className="material-icons text-gray-600">phone</span>
          <a
            href="tel:+1234567890"
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            {agencyPhone[0]}
          </a>
          ,
          <a
            href="tel:+1234567890"
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            {agencyPhone[1]}
          </a>
        </div>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="flex items-center space-x-10">
        <a href={agencySocials.facebook} target="_blank" rel="noreferrer">
          <i className="fab fa-facebook text-blue-600 text-2xl"></i>
        </a>
        <a href={agencySocials.instagram} target="_blank" rel="noreferrer">
          <i className="fab fa-instagram text-pink-600 text-2xl"></i>
        </a>
        <a href={agencySocials.whatsapp} target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp text-green-600 text-2xl"></i>
        </a>
      </div>
    </div>
  );
};

export default AgencyInfo;
