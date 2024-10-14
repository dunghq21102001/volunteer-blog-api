const mongoose = require('mongoose')
const { Schema } = mongoose
const blogSchema = new Schema({
    title: { type: String, require },
    description: { type: String, require },
    content: { type: String, require },
    image: { type: String },
    createdDate: { type: String, require },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    userId: { type: Schema.Types.ObjectId, ref: 'user', default: '670b78827a7eb186b3116554' },
}, {
    timestamps: true,
})

const blogModel = mongoose.model('blog', blogSchema)
module.exports = blogModel