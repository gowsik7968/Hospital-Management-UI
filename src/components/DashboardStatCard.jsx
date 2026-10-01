import React from 'react'

function DashboardStatCard( {
    title,value,description,icon,variant
}){
    return(
        <div className="col-md-6 col-xl-3">
            <div className={`stat-card stat-${variant}`}>
                <div className="stat-card-content">
                    <div>
                        <p className="stat-title">{title}</p>
                        <h3 className="stat-value">{value}</h3>
                        <p className="stat-description">{description}</p>
                    </div>
                    <div className="stat-icon">{icon}</div>
                </div>
            </div>
        </div>
    )
}

export default DashboardStatCard