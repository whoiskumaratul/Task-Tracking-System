import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useAuth } from '../auth/AuthContext';


function Navbar() {

  const { isAuthenticated, user, logout } = useAuth();
   

    const [toggle, setToggle] = useState(false);
     const navigate = useNavigate();
    
   
  return (
    <div>
    
     <div className="bg-[#434be6] w-full">
     <div className="max-w-[1240px] mx-auto flex items-center justify-between p-4">
     <div className='flex items-center'>
     <AiOutlineMenu 
     onClick={() => setToggle(!toggle)}
      className="text-white my-auto  text-2xl cursor-pointer" />
        <h1 className='text-2xl font-bold cursor-pointer mb-0.5 pl-4 text-white'  onClick={() => navigate('/')} >Employee Panel - TTS</h1>
     </div>


     <div className=" text-white  gap-6  hidden md:flex  ">
     { isAuthenticated ? (
      <>
        <span className="bg-white text-[#434be6] px-4 py-2 rounded  hover:bg-gray-200 transition duration-3000">Welcome, {user?.username || "User"}</span>
        <button
                   className="bg-white text-[#434be6] px-4 py-2 rounded  hover:bg-gray-200 transition duration-3000"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
               <div>
                  <button  className="bg-white text-[#434be6] px-4 py-2 rounded  hover:bg-gray-200 transition duration-3000"
                  onClick={() => navigate("/timesheet")}
                 >TimeSheet</button>
                </div>  
                </>
     ) : (
      
      <>
       
                    
        <button className='bg-white text-[#434be6] px-4 py-2 rounded hover:bg-gray-200 transition duration-300' onClick={() => navigate('/')} >Login</button>
      

      </>
       )}
     
     </div>
     
      
      
      {/* mobile responsive */}


      { toggle ?  <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0 "></div> : ''}
              
              <div className={toggle ? `fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 ` : `fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-700 my-auto `}>
                 <AiOutlineClose  onClick={() => setToggle(!toggle)}  size={20} className="absolute right-4 top-6 cursor-pointer text-white " />
            <div className="bg-[#434be6] w-full p-4 pl-8 ">
            <h1 className="text-white text-lg font-bold" >Hello, sign in</h1>
            
         </div>
          {/* <nav className="flex flex-col  ">
            <ul className="flex flex-col pt-4 pb-4  text-gray-800  capitalize  border-b-2 ">
            <li className="font-bold  text-xl  pb-2 pt-2 pl-8 " >Trending</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">best sellers</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">new release</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">movers and shakers</li>
            
              </ul>

            <ul className="flex flex-col pt-4 pb-4  text-gray-800  capitalize  border-b-2 ">
            <li className="font-bold  text-xl  pb-2 pt-2 pl-8 " >shop by category</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 " onClick={() => navigate('/')} >Mobile, computers</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">TV, appliances, electronics</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">Men's Fashion</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">Women's Fashion</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">See all</li>
            
              </ul>

              <ul className="flex flex-col pt-4 pb-4  text-gray-800  capitalize  border-b-2 ">
              <li className="font-bold  text-xl pb-2 pt-2 pl-8 " >help & settings</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">your account</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">customer service</li>
            <li className="pb-2 pt-2 pl-8 cursor-pointer hover:bg-gray-200 ">sign in</li>
           
              </ul>
            </nav> */}

      </div>


    </div>   
    </div>

    </div>
  )
}

export default Navbar