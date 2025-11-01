import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeHoursReport() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    // Fetch timesheets data from backend
   axios
  .get("http://localhost:8001/employeehoursreport",
       {
          headers: { "Content-Type": "application/json", 

             "Authorization": `Bearer ${localStorage.getItem("jwt")} `
           },
     withCredentials: true })
  .then((res) => {
    setTimesheets(res.data); // now res.data is an array of timesheet docs
  })
  .catch((err) => {
    console.error("Error fetching timesheets:", err);
      });
  }, []);

  return (
    <div>
      <div className="max-w-[1240px] mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Employee Hours Report</h1>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] border w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
             <th className="border p-2">Employee ID</th>
             <th className="border p-2">Employee ID. Name</th>
             <th className="border p-2">Project ID.projectName</th>
              <th className='border p-2'>Employee UserName</th>  
             <th className='border p-2'>Project ID</th>
             <th className="border p-2">Hours Worked</th>
             <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {timesheets.length > 0 ? (
                timesheets.map((t) => (
                  <tr key={t._id}>
                    {/* <td className="border p-2">{t._id}</td> */}
                    <td className="border p-2">{t.employeeId}</td>
                    <td className="border p-2">{t.employeeId.name}</td>
                    <td className="border p-2">
                    {t.projectId.projectName}</td>
                    <td className="border p-2">{t.username}</td>  
                    <td className="border p-2">{t.projectId}</td>
                    <td className="border p-2">{t.hoursWorked}</td>
                    <td className="border p-2">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border p-2 text-center" colSpan={5}>
                    No timesheet data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHoursReport;


// import React from 'react'

// function EmployeeHoursReport() {


     
    

//     return (



//         <div>
           
//            <div className="max-w-[1240px] mx-auto p-4">
//               <h1 className='text-2xl font-bold mb-4'>Employee Hours Report</h1>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-[600px] border w-full border-collapse">
//   <thead>
//     <tr className="bg-gray-100">
//       <th className="border p-2">Employee ID</th>
//       <th className='border p-2'>Empployee Name</th>
//       <th className='border p-2'>Project ID</th>
//       <th className="border p-2">Hours Worked</th>
//       <th className="border p-2">Date</th>
//     </tr>
//   </thead>
//   <tbody className="text-center">
//     <tr>
//       <td className='border p-2'>68c45dd412581208abfd01b8</td>
//       <td className="border p-2">John Doe</td>
//       <td className='border p-2'>P123</td>
//       <td className="border p-2">8 </td>
//       <td className="border p-2">2025-09-15</td>
//     </tr>
//     <tr>
//             <td className='border p-2'>68ca60e0b0ba98ed12b75f65</td>
//       <td className="border p-2">Atul Doe</td>
//       <td className='border p-2'>P124</td>
//       <td className="border p-2">9 </td>
//       <td className="border p-2">2025-09-16</td>
//     </tr>
//   </tbody>
// </table>

//                 </div>
//            </div>
           

//         </div>
//     )
// }

// export default EmployeeHoursReport