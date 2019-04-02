import React from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return(
        <div>
            Dashboard
            <div className="fixed-action-btn">
                <Link to="/surveys/new" href="" className="btn-floating btn-large waves-effect waves-light blue">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;