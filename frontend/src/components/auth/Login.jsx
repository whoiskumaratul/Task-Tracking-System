import React,{ useState, Navigate} from 'react'
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import  {useAuth}  from './AuthContext';

function Login() {


    const { isAuthenticated, user } = useAuth();
    console.log("Is Authenticated:", isAuthenticated);
    console.log("User Data:", user);


    if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

        // Auth context
      const { login } = useAuth();
      const navigate = useNavigate();
    
      // Local states
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
    
      // Handle form submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:8000/login",
            { username, password },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
    
          const { user, token } = response.data;
    
          if (!token) {
            alert("Login failed. No token received from the server.");
            return;
          }
          
          // Save JWT in localStorage
          localStorage.setItem("jwt", token);
          console.log("User:", user);
          console.log("Token:", token);
    
          login(user, token); // Pass to AuthContext
          navigate("/home"); // Redirect after login
          console.log("Login successful")
        } catch (error) {
          console.error("Login Error:", error);
          alert(error.response?.data?.message || "Login failed! Please try again.");
        }
      };
    
    return (
        <div>
        
        <div className="max-w-[1240px] mx-auto p-12 ">
            <div className="text-center ">
                <h1 className="text-3xl font-bold mb-12">Login</h1>
                <div className="text-lg text-gray-700">
                <form className="max-w-[400px] mx-auto" 
                
                onSubmit={handleSubmit}
                >
                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-bold">Username</label>
                    <input type="text"  name="username" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                     className="border p-2 rounded" placeholder="Enter your username" 
                        required
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-bold">Password</label>
                    <input type="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     className="border p-2 rounded" placeholder="Enter your password" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Login</button>
                </form>
                </div>
            </div>
        </div>


        </div>
    )
}

export default Login



// if we wont decode user data after login from backend side then we have an option to decode employee data after login in frontend side
// import { jwtDecode } from "jwt-decode"; // at top

// // Inside handleSubmit success
// const { token } = response.data;

// if (!token) {
//   alert("Login failed. No token received from the server.");
//   return;
// }

// // Decode token to get user info
// const decodedUser = jwtDecode(token);

// localStorage.setItem("jwt", token);
// console.log("Decoded User:", decodedUser);
// console.log("Token:", token);

// login(decodedUser, token); // Pass decoded data
// navigate("/home");
