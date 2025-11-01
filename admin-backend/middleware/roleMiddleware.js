
const checkRole = ( ...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming user role is stored in req.user.role
      console.log("user Role", userRole) 
      if(!allowedRoles.includes(userRole)){
        return res.status(403).json({ status: false, error: 'Access Denied : Insufficient permissions' }); // Forbidden' });
      }
      next();
};
};

module.exports = checkRole;