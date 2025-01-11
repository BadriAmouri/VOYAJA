import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pdfIcon from "../../assets/pdf.png";

const AgenciesTable = () => {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/Non-verified-agencies"
      );
      console.log("the data of the agencies is :", response.data);
      setAgencies(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agencies:", error);
    }
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

  const handleApprove = async (id) => {
    try {
      console.log("Agency id is *********************** ", id);
      await axios.put(`http://localhost:5000/admin/approve-agency/${id}`);
      console.log("Agency approved successfully!");
      fetchAgencies(); // Refresh data
    } catch (error) {
      console.error("Error approving agency:", error);
    }
  };

  const handleRowClick = (agencyId) => {
    navigate(`/agencyprofile/${agencyId}`);
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/admin/reject-agency/${id}`);
      alert("Agency rejected successfully!");
      fetchAgencies(); // Refresh data
    } catch (error) {
      console.error("Error rejecting agency:", error);
    }
  };

  if (loading) {
    return <p>Loading agencies...</p>;
  }

  return (
    <div
      className=" p-6 bg-white shadow-lg rounded-lg rounded-lg mb-10"
      style={{ marginLeft: "200px", width: "1200px" }}
    >
      <h1 className="text-2xl font-bold mb-4">Agencies Approval</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Document</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.agency_id}>
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
                        className="flex flex-col items-center gap-2 text-blsck-500 hover:underline"
                        onClick={() =>
                          handleOpenDocument(
                            `data:application/pdf;base64,${agency.reg_commerce}`
                          )
                        }
                      >
                        <img
                          src={pdfIcon}
                          alt="registre de commerce"
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

              <td className="px-4 py-2 border-b">
                <div className="flex flex-row items-center justify-center gap-2">
                  <button
                    className="px-5 py-2 bg-[#4eb7ac] text-black text-sm font-medium rounded-lg cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-center gap-2 mt-auto hover:text-[#4eb7ac] hover:bg-white hover:border hover:border-[#4eb7ac]"
                    onClick={() => handleApprove(agency.agency_id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-5 py-2 bg-[#ff2c2c] text-black text-sm font-medium rounded-lg cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-center gap-2 mt-auto hover:text-[#ff2c2c] hover:bg-white hover:border hover:border-[#ff2c2c]"
                    onClick={() => handleReject(agency.agency_id)}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgenciesTable;
