import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pdfIcon from "../../assets/pdf.png";
import SideMenu from "./sideMenu";

const AgenciesAccounts = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/admin/verified-agencies"
      );
      console.log("the data of the agencies is :", response.data);
      setAgencies(response.data);
      setFilteredAgencies(response.data); // Initialize filtered list
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agencies:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase().trim(); // Convert to lowercase and trim spaces
    setSearchTerm(searchValue);
    const filtered = agencies.filter((agency) =>
      agency.agency_name.toLowerCase().includes(searchValue)
    );
    setFilteredAgencies(filtered);
  };

  const handleOpenDocument = (pdfDataUrl) => {
    const newTab = window.open();
    newTab.document.write(`
      <html>
        <body>
          <embed src="${pdfDataUrl}" width="100%" height="100%" type="application/pdf" />
        </body>
      </html>
    `);
    newTab.document.close();
  };

  const handleRowClick = (agencyId) => {
    navigate(`/agencyprofile/${agencyId}`);
  };

  if (loading) {
    return <p>Loading agencies...</p>;
  }

  return (
    <div className="flex flex-row items-start justify-between">
      {/* Side Menu */}
      <SideMenu />

      {/* Main Content */}
      <div
        className="p-6 bg-white shadow-lg rounded-lg mb-10 text-black mt-10"
        style={{ marginLeft: "300px", width: "1180px" }}
      >
        <h1 className="text-2xl font-bold mb-4">Agencies Accounts</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by agency name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Agencies Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone</th>
              <th className="px-4 py-2 border-b">Document</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <tr
                  key={agency.agency_id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(agency.agency_id)}
                >
                  <td className="px-4 py-2 border-b">{agency.agency_id}</td>
                  <td className="px-4 py-2 border-b">{agency.agency_name}</td>
                  <td className="px-4 py-2 border-b">{agency.agency_email}</td>
                  <td className="px-4 py-2 border-b">
                    {agency.agency_phone_number}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {agency.license || agency.reg_commerce ? (
                      <div className="flex flex-row items-center justify-center gap-2">
                        {agency.license && (
                          <button
                            className="flex flex-col items-center gap-2 text-black-500 hover:underline"
                            onClick={() =>
                              handleOpenDocument(
                                `data:application/pdf;base64,${agency.license}`
                              )
                            }
                          >
                            <img
                              src={pdfIcon}
                              alt="License"
                              style={{ width: "20px", height: "20px" }}
                            />
                            License
                          </button>
                        )}
                        {agency.reg_commerce && (
                          <button
                            className="flex flex-col items-center gap-2 text-black-500 hover:underline"
                            onClick={() =>
                              handleOpenDocument(
                                `data:application/pdf;base64,${agency.reg_commerce}`
                              )
                            }
                          >
                            <img
                              src={pdfIcon}
                              alt="Registre de commerce"
                              style={{ width: "20px", height: "20px" }}
                            />
                            Registre
                          </button>
                        )}
                      </div>
                    ) : (
                      "No Document"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-2 border-b text-gray-500"
                >
                  No agencies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgenciesAccounts;
