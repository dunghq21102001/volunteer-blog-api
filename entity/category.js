const mongoose = require('mongoose')
const { Schema } = mongoose
const categorySchema = new Schema({
    name: {type: String, require},
    description: {type: String, require},
    blogs: [{ type: Schema.Types.ObjectId, ref: 'blog' }]
}, {
    timestamps: true,
})

const categoriesModel = mongoose.model('category', categorySchema)
module.exports = categoriesModel