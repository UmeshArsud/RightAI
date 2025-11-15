import React from 'react';
import "./Dashboard.css"

const Dashboard: React.FC = () => {
    return(
        <>
            <div className="dashboard-container">
                <header className="dashboard-header">
                <h1>Welcome to Your Dashboard</h1>
                <button className="logout-button">Logout</button>
                </header>

                <main className="dashboard-main">
                <div className="dashboard-widget">
                    <h2>My Profile</h2>
                    <p>This is where user profile information will go.</p>
                </div>
                <div className="dashboard-widget">
                    <h2>My Reviews</h2>
                    <p>This is where a list of user reviews will go.</p>
                </div>
                <div className="dashboard-widget">
                    <h2>Settings</h2>
                    <p>This is where user settings will go.</p>
                </div>
                </main>

                <footer className="dashboard-footer">
                <p>&copy; 2024 Review App. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}

export default Dashboard;