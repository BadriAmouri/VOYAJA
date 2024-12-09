export const productsColumns = [
  {
    accessorKey: "Offer_place", //access nested data with dot notation
    header: "Offer_place",
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
    accessorKey: "Depart_City", //access nested data with dot notation
    header: "Depart_City",
  },
  {
    accessorKey: "Destination_City", //access nested data with dot notation
    header: "Destination_City",
  },
  {
    accessorKey: "Number_Of_Days", //access nested data with dot notation
    header: "Number_Of_Days",
  },
  {
    accessorKey: "price",
    header: "Price",
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

export const products = [
  {
    id: 1,
    Offer_place: "Dubai",
    Depart_City: "Algiers",
    Destination_City: "Dubai",
    Number_Of_Days: 10,
    instock: false,
    price: 20,
    image: "/images/products/317JiGToz-L.jpg",
    Options : {
        "" : "",
        "" : "",
        "" : "",
    }
  },
  {
    id: 2,
    Offer_place: "Paris",
    Depart_City: "Algiers",
    Destination_City: "Paris",
    Number_Of_Days: 7,
    instock: true,
    price: 30,
    image: "/images/products/paris_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 3,
    Offer_place: "New York",
    Depart_City: "Algiers",
    Destination_City: "New York",
    Number_Of_Days: 14,
    instock: true,
    price: 50,
    image: "/images/products/new_york_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 4,
    Offer_place: "London",
    Depart_City: "Algiers",
    Destination_City: "London",
    Number_Of_Days: 5,
    instock: false,
    price: 25,
    image: "/images/products/london_offer.jpg",
  },
  {
    id: 5,
    Offer_place: "Tokyo",
    Depart_City: "Algiers",
    Destination_City: "Tokyo",
    Number_Of_Days: 12,
    instock: true,
    price: 60,
    image: "/images/products/tokyo_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 6,
    Offer_place: "Rome",
    Depart_City: "Algiers",
    Destination_City: "Rome",
    Number_Of_Days: 8,
    instock: false,
    price: 40,
    image: "/images/products/rome_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 7,
    Offer_place: "Madrid",
    Depart_City: "Algiers",
    Destination_City: "Madrid",
    Number_Of_Days: 6,
    instock: true,
    price: 35,
    image: "/images/products/madrid_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 8,
    Offer_place: "Los Angeles",
    Depart_City: "Algiers",
    Destination_City: "Los Angeles",
    Number_Of_Days: 15,
    instock: true,
    price: 70,
    image: "/images/products/los_angeles_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 9,
    Offer_place: "Barcelona",
    Depart_City: "Algiers",
    Destination_City: "Barcelona",
    Number_Of_Days: 9,
    instock: false,
    price: 28,
    image: "/images/products/barcelona_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 10,
    Offer_place: "Berlin",
    Depart_City: "Algiers",
    Destination_City: "Berlin",
    Number_Of_Days: 10,
    instock: true,
    price: 45,
    image: "/images/products/berlin_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 11,
    Offer_place: "Sydney",
    Depart_City: "Algiers",
    Destination_City: "Sydney",
    Number_Of_Days: 20,
    instock: true,
    price: 80,
    image: "/images/products/sydney_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 12,
    Offer_place: "Cape Town",
    Depart_City: "Algiers",
    Destination_City: "Cape Town",
    Number_Of_Days: 18,
    instock: false,
    price: 65,
    image: "/images/products/cape_town_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 13,
    Offer_place: "Bangkok",
    Depart_City: "Algiers",
    Destination_City: "Bangkok",
    Number_Of_Days: 11,
    instock: true,
    price: 55,
    image: "/images/products/bangkok_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 14,
    Offer_place: "Cairo",
    Depart_City: "Algiers",
    Destination_City: "Cairo",
    Number_Of_Days: 7,
    instock: true,
    price: 25,
    image: "/images/products/cairo_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 15,
    Offer_place: "Moscow",
    Depart_City: "Algiers",
    Destination_City: "Moscow",
    Number_Of_Days: 13,
    instock: true,
    price: 60,
    image: "/images/products/moscow_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 16,
    Offer_place: "Rio de Janeiro",
    Depart_City: "Algiers",
    Destination_City: "Rio de Janeiro",
    Number_Of_Days: 16,
    instock: false,
    price: 72,
    image: "/images/products/rio_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
  {
    id: 17,
    Offer_place: "Istanbul",
    Depart_City: "Algiers",
    Destination_City: "Istanbul",
    Number_Of_Days: 10,
    instock: true,
    price: 38,
    image: "/images/products/istanbul_offer.jpg",
    Options : {
      "" : "",
      "" : "",
      "" : "",
  }
  },
];
