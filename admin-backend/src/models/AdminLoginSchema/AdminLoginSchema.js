const mongoose = require('mongoose')

const AdminLoginSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: 'admin',
     //   enum: ['admin', 'manager', 'employee']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})


module.exports = mongoose.model('adminlogins', AdminLoginSchema)