import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const hospitalID = queryParams.get('hospitalID');
    const hospitalName = queryParams.get('hospitalName');

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to {hospitalName} (ID: {hospitalID})</h1>
            <div className="cards-container">
                <div className="card" onClick={() => handleNavigation('/add-patient')}>
                    Add Patient
                </div>
                <div className="card" onClick={() => handleNavigation('/track-medicine')}>
                    Track Medicine
                </div>
                <div className="card" onClick={() => handleNavigation(`/inventory?hospitalName=${hospitalName}&hospitalID=${hospitalID}`)}>
                    Add Inventory
                </div>
                <div className="card" onClick={() => handleNavigation('/schedule-doctor')}>
                    Schedule Doctor
                </div>
                <div className="card" onClick={() => handleNavigation('/add-doctor')}>
                    Add Doctor
                </div>
                <div className="card" onClick={() => handleNavigation('/doctors-round')}>
                    Doctors Round 
                </div>
                <div className="card" onClick={() => handleNavigation('/check-doctor-details')}>
                    Check Doctor Details
                </div>
                <div className="card" onClick={() => handleNavigation('/opd-medicine')}>
                    OPD Medicine 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

