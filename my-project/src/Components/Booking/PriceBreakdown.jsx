// // import React, { useState } from 'react';
// // import planeImage from '../../assets/bookingPics/plane.png';

// // const PriceBreakdown = () => {
// //   const [selectedItems, setSelectedItems] = useState([]);

// //   const handleCheckboxChange = (event) => {
// //     const value = event.target.value;
// //     setSelectedItems((prevItems) =>
// //       prevItems.includes(value)
// //         ? prevItems.filter((item) => item !== value)
// //         : [...prevItems, value]
// //     );
// //   };

// //   return (
// //     <div className="price-breakdown">
// //       <p className="flight_booking">
// //         <img src={planeImage} alt="plane Image" className="plane_booking" />
// //         Economy
// //         <br />
// //         Emirates A380 Airbus
// //         <br />
// //         reviews
// //       </p>
// //       <hr />

// //       <h3>Your Booking is Protected by VOYAGA</h3>
// //       <p><strong>Price Details</strong></p>
// //       <div className="price-details_booking">
// //         <div className="checkbox-item">
// //           <label>
// //             <input
// //               type="checkbox"
// //               value="Base Fare"
// //               onChange={handleCheckboxChange}
// //             />
// //             Base Fare: <span>$400</span>
// //           </label>
// //         </div>
// //         <div className="checkbox-item">
// //           <label>
// //             <input
// //               type="checkbox"
// //               value="Discount"
// //               onChange={handleCheckboxChange}
// //             />
// //             Discount: <span>-$400</span>
// //           </label>
// //         </div>
// //         <div className="checkbox-item">
// //           <label>
// //             <input
// //               type="checkbox"
// //               value="Taxes"
// //               onChange={handleCheckboxChange}
// //             />
// //             Taxes: <span>$400</span>
// //           </label>
// //         </div>
// //         <div className="checkbox-item">
// //           <label>
// //             <input
// //               type="checkbox"
// //               value="Service Fee"
// //               onChange={handleCheckboxChange}
// //             />
// //             Service Fee: <span>$400</span>
// //           </label>
// //         </div>
// //         <hr />
// //         <div className="checkbox-item">
// //           <label>

// //             Total: <span>$400</span>
// //           </label>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PriceBreakdown;
// import React, { useState, useEffect } from 'react';
// import planeImage from '../../assets/bookingPics/plane.png';

// const PriceBreakdown = ({ setTotalPrice }) => {
//   const [selectedItems, setSelectedItems] = useState([]); // Array of selected option objects
//   const [options, setOptions] = useState([]);  // All available options
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch options for the offer with ID 6
//   useEffect(() => {
//     const fetchOfferOptions = async () => {
//       try {
//         const response = await fetch('/api/option/8');
//         if (!response.ok) {
//           throw new Error('Failed to fetch offer options');
//         }
//         const data = await response.json();
//         setOptions(data);  // Set the options in state
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOfferOptions();
//   }, []);

//   // Handle checkbox change for selected items
//   const handleCheckboxChange = (event, option) => {
//     setSelectedItems((prevItems) =>
//       prevItems.some((item) => item.option_id === option.option_id)
//         ? prevItems.filter((item) => item.option_id !== option.option_id)
//         : [...prevItems, option]
//     );
//   };

//   // Calculate the total price
//   useEffect(() => {
//     const totalPrice = selectedItems.reduce((total, item) => total + item.option_price, 0);
//     setTotalPrice(totalPrice);
//   }, [selectedItems, setTotalPrice]);

//   if (loading) {
//     return <p>Loading flight details...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="price-breakdown">
//       <p className="flight_booking">
//         <img src={planeImage} alt="plane Image" className="plane_booking" />
//         Economy
//         <br />
//         Emirates A380 Airbus
//         <br />
//         reviews
//       </p>
//       <hr />

//       <h3>Your Booking is Protected by VOYAGA</h3>
//       <p><strong>Price Details</strong></p>
//       <div className="price-details_booking">
//         {options.length > 0 ? (
//           options.map((option) => (
//             <div className="checkbox-item" key={option.option_id}>
//               <label>
//                 <input
//                   type="checkbox"
//                   value={option.option_id}
//                   onChange={(event) => handleCheckboxChange(event, option)}
//                 />
//                 {option.option_title}: <span>${option.option_price}</span>
//               </label>
//             </div>
//           ))
//         ) : (
//           <p>No options available.</p>
//         )}

//         <hr />
//         <div className="checkbox-item">
//            <label>
//             Total: <span>${selectedItems.reduce((total, item) => total + item.option_price, 0)}</span>
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PriceBreakdown;
//AFETR THE ARRAY WITH REALY SELECTED OPTIONS
import React, { useState, useEffect } from 'react';
import planeImage from '../../assets/bookingPics/plane.png';

const PriceBreakdown = ({ setTotalPrice, setSelectedOptionIds }) => {
  const [selectedItems, setSelectedItems] = useState([]); // Array of selected option objects
  const [options, setOptions] = useState([]); // All available options
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferOptions = async () => {
      try {
        const response = await fetch('/api/option/9');
        if (!response.ok) {
          throw new Error('Failed to fetch offer options');
        }
        const data = await response.json();
        setOptions(data); // Set the options in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferOptions();
  }, []);

  const handleCheckboxChange = (event, option) => {
    const updatedItems = selectedItems.some((item) => item.option_id === option.option_id)
      ? selectedItems.filter((item) => item.option_id !== option.option_id)
      : [...selectedItems, option];

    setSelectedItems(updatedItems);

    // Update parent with selected option IDs
    const selectedIds = updatedItems.map((item) => item.option_id);
    setSelectedOptionIds(selectedIds);
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce((total, item) => total + item.option_price, 0);
    setTotalPrice(totalPrice);
  }, [selectedItems, setTotalPrice]);

  if (loading) {
    return <p>Loading flight details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="price-breakdown">
      <p className="flight_booking">
        <img src={planeImage} alt="plane Image" className="plane_booking" />
        Economy
        <br />
        Emirates A380 Airbus
        <br />
        reviews
      </p>
      <hr />

      <h3>Your Booking is Protected by VOYAGA</h3>
      <p><strong>Price Details</strong></p>
      <div className="price-details_booking">
        {options.length > 0 ? (
          options.map((option) => (
            <div className="checkbox-item" key={option.option_id}>
              <label>
                <input
                  type="checkbox"
                  value={option.option_id}
                  onChange={(event) => handleCheckboxChange(event, option)}
                />
                {option.option_title}: <span>${option.option_price}</span>
              </label>
            </div>
          ))
        ) : (
          <p>No options available.</p>
        )}
        <hr />
        <div className="checkbox-item">
          <label>
            Total: <span>${selectedItems.reduce((total, item) => total + item.option_price, 0)}</span>
          </label>
        </div>
      </div>
    </div>
  );
};
// 
export default PriceBreakdown;
// 