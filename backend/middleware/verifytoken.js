// const jwt = require("jsonwebtoken");

// function verifyToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(403).json({ status: false, error: "No token" });

//   const token = authHeader.split(" ")[1]; // "Bearer <token>"
//   if (!token) return res.status(403).json({ status: false, error: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;  // attach employeeId, projectId to req.user
//     next();
//   } catch (err) {
//     return res.status(403).json({ status: false, error: "Invalid token" });
//   }
// }
// module.exports = verifyToken;

// If token is valid, req.user will have { employeeId, username, projectId }
// Use this middleware in routes that need authentication

// const jwt = require('jsonwebtoken'); // Import JWT library
// const secretKey = "mysecretkey"


// const verifytoken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log("token verify wala aa gaya hai", token)

//   if (!token) {
//     return res.status(401).json({ status: false, error: 'Unauthorized' });
//   }

//   try {
//     const user = jwt.verify(token, secretKey);
//     req.user = user; // Attach decoded user to request
//     next();
//   } catch (err) {
//     return res.status(403).json({ status: false, error: 'Invalid token' });
//   }
// };

// module.exports = verifytoken;


const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ status: false, error: "No token provided" });

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) return res.status(403).json({ status: false, error: "Invalid token" });

    req.user = decoded; // { employeeId, username, projectId }
    next();
  });
}

module.exports = verifyToken;
