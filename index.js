const express = require('express')
const morgan = require("morgan")
const cors = require("cors");
const connectDB = require('./database')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));



connectDB()
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://volunteer-edu-admin.netlify.app', , 'https://volunteer-edu.netlify.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(morgan("combined"))
app.use(cors(corsOptions));

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