const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    userName: { type: String, require },
    password: { type: String, require },
    address: { type: String },
    phone: { type: String },
    university: { type: String },
    department: { type: String },
    role: { type: String, require },
    image: { type: String, require },
    blogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }],
    createdDate: { type: String, require },
}, {
    timestamps: true,
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel