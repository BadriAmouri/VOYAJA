import React from "react";
import AgenciesGraph from "./agenciesGraph";
import BookingsGraph from "./bookingGraph";
import ClientsGraph from "./clientGraph";
import OffersGraph from "./offerGraph";
import AgenciesTable from "./AgenciesApproval";

const GraphsSection = () => {
    return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', marginLeft: '50px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' ,marginLeft: '30px', flexDirection: 'row', marginTop: '10px', paddingTop: '50px'}}>
            <BookingsGraph />
            <AgenciesGraph />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' ,marginLeft: '30px', flexDirection: 'row',  paddingBottom: '50px'}}>
        <ClientsGraph/>
        <OffersGraph/>
    </div>
    <AgenciesTable/>
    </div>
    );
};  
export default GraphsSection;