
import SideMenu from '../Components/Admin/sideMenu';
import MetricsSection from '../Components/Admin/metricsSection';
import GraphsSection from '../Components/Admin/graphsSection';

const Admin = () => {
    return (
        <div className="admin-page text-black">
            <div className="admin-main">
                <SideMenu />
                <div className="admin-content">
                    <MetricsSection />
                    <GraphsSection />  
                </div>
            </div>
        </div>
    );
};

export default Admin;