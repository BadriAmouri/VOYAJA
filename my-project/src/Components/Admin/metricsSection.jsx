import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    RiBuilding2Line,
    RiUser3Line,
    RiPlaneLine,
    RiFileList2Line,
   
  } from "react-icons/ri";
import MetricsCard from './metricCards';

const MetricsSection = () => {
            const [metrics, setMetrics] = useState({
                agencies: 0,
                clients: 0,
                offers: 0,
                bookings: 0
            });

            useEffect(() => {
                axios.get('http://localhost:5001/admin/metrics')
                    .then(response => {
                        setMetrics(response.data);
                        console.log(axios.defaults.headers);

                    })
                    .catch(error => {
                        console.error('Error fetching metrics**********************:', error);
                    });
            }, []);

            return (
                <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: '250px' }}>
                    <MetricsCard title="Number of Agencies" value={metrics.agencies} icon={<RiBuilding2Line />} color={"#F9F7C9"} />
                    <MetricsCard title="Number of Users" value={metrics.clients} icon={<RiUser3Line className="h-6 w-6" />} color={"#D5F0C1"} />
                    <MetricsCard title="Number of Offers" value={metrics.offers} icon={<RiPlaneLine className="h-6 w-6 transform rotate-45" />} color={"#AAD9BB"} />
                    <MetricsCard title="Number of Bookings" value={metrics.bookings} icon={<RiFileList2Line className="h-6 w-6" />} color={"#80BCBD"} />
                </div>
            );
        };
export default MetricsSection;