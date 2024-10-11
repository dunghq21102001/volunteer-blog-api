const express = require('express')
const morgan = require("morgan")
const cors = require("cors");
const connectDB = require('./database')

const app = express()

connectDB()

app.use(morgan("combined"))
app.use(cors())

const port = 3001
const PREFIX_API_URL = '/api/v1'

const userRoute = require('./router/user.js')
const blogRoute = require('./router/blog.js')
const categoryRoute = require('./router/category.js')

app.use(`${PREFIX_API_URL}/users/`, userRoute)
app.use(`${PREFIX_API_URL}/blogs/`, blogRoute)
app.use(`${PREFIX_API_URL}/categories/`, categoryRoute)

app.get('/', (req, res) => {
  res.send('server working 🔥🔥🔥')
})

app.listen(port, () => {
  console.log(`My Server listening on port ${port}`)
})