import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import { customers } from "../../data/customers";


const TransactionCustomer = () => {
  const [ispro_user,setIspro_user] = useState(false)
  return (
    <Grid >
      { ispro_user ?
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            padding: "16px",
          }}
        >
           
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ pb: 1 }}>
              New Customer List
            </Typography>
            <FaEllipsisH />
          </Box>
          <Divider />
          <Box sx={{ marginTop: 1 }}>
            {customers
              .slice(0, 4)
              .map(({ customer_id, customer_name, email, img }) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "10px 0",
                  }}
                  key={customer_id}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar src={img} sx={{ width: 30, height: 30 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: "18px" }}>
                        {customer_name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                        {email}
                      </Typography>
                    </Box>
                  </Box>
                  <FaEllipsisH />
                </Box>
              ))}
          </Box>
          <Divider />
          <Typography variant="subtitle1" sx={{ textAlign: "center", mt: 1 }}>
            <Link to="/customers" className="link">
              View more
            </Link>
          </Typography>
       
        </Paper>
         : 
         <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            padding: "16px",
          }}
        >
          <div sx={{
              display: "flex",
              alignItems: "center",
              
            }}>
              <p>pay to see Trending offers</p>
               
            </div>
        </Paper>
         }
      
    </Grid>
  );
};

export default TransactionCustomer;
