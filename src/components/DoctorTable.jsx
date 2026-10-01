function DoctorTable({doctors,onView,onEdit,onDelete}){
 return(
    <div className="table-responsive">
        <table className="table doctor-table">
            <thead>
                <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Department</th>
                    <th>Experience</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {doctors.length===0 ?(
                    <tr>
                        <td className="text-center py-5" colSpan="7">No doctors found</td>
                    </tr>
                ):(
                    doctors.map((doctor)=>(
                        <tr key={doctor.id}>
                            <td>
                                <div className="doctor-info">
                                    <div className="doctor-avatar">{doctor.name.charAt(0)}</div>
                                    <div>
                                        <div className="doctor-name">{doctor.name}</div>
                                
                                        <div className="doctor-id">{doctor.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.department}</td>
                            <td>{doctor.experience} years</td>
                            <td>{doctor.phone}<br/>
                            <small className="text-muted">{doctor.email}</small></td>
                            <td>
                                <span className={`doctor-status 
                                    ${doctor.status === "Available"
                                    ?"doctor-status-available"
                                    :"doctor-status-leave"}`}>{doctor.status}</span>
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-outline-primary"onClick={()=>onView(doctor)}>View</button>
                                    <button className="btn btn-sm btn-outline-secondary"onClick={()=>onEdit(doctor)}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={()=>onDelete(doctor)}>Delete</button>
                                </div>
                            </td>
                        
                        </tr>   
                    ))
                )}
            </tbody>
        </table>
    </div>
 )   
}
export default DoctorTable