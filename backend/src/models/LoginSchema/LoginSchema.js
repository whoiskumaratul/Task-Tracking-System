const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    userType: {
        type: String,
        default: 'employee',
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
    },
    role: {
        type: String,
        default: "employee"

    },
//     projectId: {
//         type: String,
//         required: true
//     }
// })

projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'   // Refers to the Project collection
    }]
}, { timestamps: true });


module.exports = mongoose.model('employeelogins', LoginSchema)