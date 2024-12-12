export const ordersColumns = [
  {
    accessorKey: "offer", //access nested data with dot notation
    header: "Offer",
  },
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "order_date", //normal accessorKey
    header: "Date",
  },
  // add the number of days 
  // add the details of (booked with housing [avec guide or not , avec hotel or not ! ])
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    //or in the component override callbacks like this
    Cell: ({ cell, row }) => (
      <div>
        {row.original.status === "Pending" && (
          <span className={`status ${cell.getValue()}`}>{cell.getValue()}</span>
        )}
        {row.original.status === "Delivered" && (
          <span className={`status ${cell.getValue()}`}>{cell.getValue()}</span>
        )}
        {row.original.status === "Cancelled" && (
          <span className={`status ${cell.getValue()}`}>{cell.getValue()}</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export const orders = [
  {
    id: 1001,
    order_date: "January 1, 2021",
    customer_name: "John Smith",
    offer: "Dubai",
    status: "Pending",
    amount: "600 DZ",
  },
  {
    id: 1002,
    order_date: "February 15, 2021",
    customer_name: "Jane Doe",
    offer: "Paris",
    status: "Delivered",
    amount: "1200 DZ",
  },
  {
    id: 1003,
    order_date: "March 10, 2021",
    customer_name: "Alice Johnson",
    offer: "New York",
    status: "Cancelled",
    amount: "800 DZ",
  },
  {
    id: 1004,
    order_date: "April 22, 2021",
    customer_name: "Michael Brown",
    offer: "Tokyo",
    status: "Pending",
    amount: "950 DZ",
  },
  {
    id: 1005,
    order_date: "May 5, 2021",
    customer_name: "Emily Davis",
    offer: "London",
    status: "Delivered",
    amount: "600 DZ ",
  },
  {
    id: 1006,
    order_date: "June 18, 2021",
    customer_name: "Chris Wilson",
    offer: "Sydney",
    status: "Cancelled",
    amount: "700 DZ",
  },
  {
    id: 1007,
    order_date: "July 8, 2021",
    customer_name: "Sarah Lee",
    offer: "Cape Town",
    status: "Pending",
    amount: "450 DZ",
  },
  {
    id: 1008,
    order_date: "August 25, 2021",
    customer_name: "David Garcia",
    offer: "Bangkok",
    status: "Delivered",
    amount: "1000 DZ",
  },
  {
    id: 1009,
    order_date: "September 12, 2021",
    customer_name: "Laura Martinez",
    offer: "Berlin",
    status: "Cancelled",
    amount: "750 DZ",
  },
  {
    id: 1010,
    order_date: "October 30, 2021",
    customer_name: "James White",
    offer: "Rome",
    status: "Pending",
    amount: "670 DZ",
  },
];

