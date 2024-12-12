export const productsColumns = [
  {
    accessorKey: "offer_name", //access nested data with dot notation
    header: "offer_name",
  },
  {
    accessorKey: "starting_date", //access nested data with dot notation
    header: "starting_date",
  },
  
  {
    accessorKey: "image", //edit it to be images
    header: "Image",
    size: 100,
    Cell: ({ cell }) => (
      <div>
        <img src={cell.getValue()} alt="" width={60} />
      </div>
    ),
  },
  {
    accessorKey: "offer_depart", //access nested data with dot notation
    header: "offer_depart",
  },
  {
    accessorKey: "offer_dest", //access nested data with dot notation
    header: "offer_dest",
  },
  {
    accessorKey: "duration", //access nested data with dot notation
    header: "duration",
  },
  {
    accessorKey: "min_price",
    header: "min_price",
    Cell: ({ cell }) => <span>${cell.getValue()}</span>,
  },
  {
    accessorKey: "instock",
    header: "Status",
    //or in the component override callbacks like this
    Cell: ({ cell, row }) => (
      <div>
        {row.original.instock && (
          <span style={{ color: "#388b84", textTransform: "capitalize" }}>
            On Market
          </span>
        )}
        {!row.original.instock && (
          <span style={{ color: "#fd4332", textTransform: "capitalize" }}>
            Stopped
          </span>
        )}
      </div>
    ),
  },
];

// set the ID to be the offer ID 
export const products = [
  {
    // use the first one for getting the offer when going to the offer description page 
    id: 1,
    offer_id : 4,
    offer_name: "Dubai",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Dubai",
    duration: 10,
    instock: false,
    min_price: 20,
    image: "/images/products/317JiGToz-L.jpg",
    Options : {
        "" : "",
        "" : "",
        "" : "",
    }
  },
  {
    id: 2,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 3,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 4,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 5,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 6,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 7,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 8,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 9,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 10,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 11,
    offer_id : 4,
    offer_name: "Paris",
    starting_date : "2025-02-28T23:00:00.000Z",
    offer_depart: "Algiers",
    offer_dest: "Paris",
    duration: 7,
    instock: true,
    min_price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  
];


