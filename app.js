const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

app.use(express.json())

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

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('files'))
app.use('/api/users', user)
app.use('/api/products', product)
app.use('/api/user-products', userProduct)

app.use('/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
)

app.listen(port, ()=> {
    console.log('Server is running')
})