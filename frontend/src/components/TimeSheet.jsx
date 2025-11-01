import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './auth/AuthContext';

function TimeSheet() {


  const { isAuthenticated, user } = useAuth();

   const [projects, setProjects] = useState([]);   // list of projects assigned to employee
    const [projectId, setProjectId] = useState(""); // selected project

  const [timesheets, setTimesheets] = useState("")
  const [message, setMessage] = useState("")

   useEffect(() => {
      const fetchProjects = async () => {
        try {
          const token = localStorage.getItem("token"); // assuming you stored token after login
          const res = await axios.get("http://localhost:8000/assignProject", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProjects(res.data.projects); // backend should return assigned projects
        } catch (err) {
          console.error(err);
        }
      };
      fetchProjects();
    }, []);


   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/timesheet",
        { projectId, hoursWorked, date: new Date() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(`✅ ${hoursWorked} hours submitted for project.`);
      setHoursWorked("");
      setProjectId(""); // reset
    } catch (err) {
      console.error(err);
    }
  };


  return (


    <div>
    
    <div className="max-w-[1240px] mx-auto p-4">
    <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Welcome to the Employee Panel</h1>
    <div className="text-lg text-gray-700">
    <form className='max-w-[600px] mx-auto'
    onSubmit={handleSubmit}
    >
      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold'>Project </label>
        <input type="text" value="Project A" readonly />
        </div>
        
        <div className='flex flex-col mb-4'>
          <label className='mb-2 font-bold'>Employee UserName</label>
          <input type="text" value={user?.username || "User"} readonly />
          </div>

          <div className='flex flex-col mb-4'>

 <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">-- Select Project --</option>
          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.projectName}
            </option>
          ))}
        </select>


</div>
          

        <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold'>TIme (Hours)</label>
        <input type="textarea"  className='border p-2 rounded' 
        name="hoursWorked"
        value={timesheets}
        onChange={(e) => setTimesheets(e.target.value)}
         />
        </div>
        <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300'>Submit</button>
    </form>
    </div>

    <div> {message && (
        <p className="mt-4 text-green-600 font-semibold">{message}</p>
      )}</div>
    </div>
    </div>
    </div>
  )
}

export default TimeSheet