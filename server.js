import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import dbConnection from './databases/dbConnection.js';
import authRouter from './src/modules/auth/auth.router.js';
import cors from 'cors'
import categoryRouter from './src/modules/category/category.router.js';
import productRouter from './src/modules/product/product.router.js';

// confirgue dotenv
dotenv.config();

// database config
dbConnection()

// rest object
const app = express()



// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//
app.use('/api/v1/auth', authRouter)

app.use('/api/v1/category' , categoryRouter )

app.use('/api/v1/product' , productRouter )



//rest api
app.get('/', (req, res) => res.send('Hello World!'))


const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Server Running on ${process.env.DEV_MODE} on port ${port}!`.bgCyan.white))

