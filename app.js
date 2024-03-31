const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Connection to MongoDB established"),
            err => {console.log("Failed to connect to MongoDB, err")}
        })

const cors = require('cors')
app.use(cors({
  origin: "*"
  // origin:["http://localhost:8000", "http://localhost:3000"]
}))

const user = require('./routes/user.route')
const product = require('./routes/product.route')
const userProduct = require('./routes/user.products.route')


app.use('/', express.static('files'))
app.use('/api/users', user)
app.use('/api/products', product)
app.use('/api/user-products', userProduct)

app.use('/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
)

module.exports = app