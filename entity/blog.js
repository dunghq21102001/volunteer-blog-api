const mongoose = require('mongoose')
const { Schema } = mongoose
const blogSchema = new Schema({
    title: { type: String, require },
    description: { type: String, require },
    content: { type: String, require },
    createdDate: { type: String, require },
    category: { type: Schema.Types.ObjectId, ref: 'category'},
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
}, {
    timestamps: true,
})

const blogModel = mongoose.model('blog', blogSchema)
module.exports = blogModel