import React from "react";
const MetricsCard = ({
    icon,
    title,
    value,
    color = "#ffffff" // default color if none is provided
}) => {
    return (
        <div className="shadow-md rounded-lg m-4 p-4 flex items-center" style={{backgroundColor: color}}>
            <div className="text-3xl mr-4 text-black">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-semibold text-black">{title}</h3>
                <p className="text-[#4eb7ac] font-semibold" style={{ fontSize: '32px' }}>{value}</p>
            </div>
        </div>
    );
}

export default MetricsCard;