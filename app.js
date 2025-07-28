const express = require('express');
const app = express();
const port = 3001;

const connectionDb = require('./connectionDb')

const userRouter = require('./server/router/auth-route')

const categoryRouter = require('./server/router/category-route');

const productRouter = require('./server/router/product-route')

const warehouseRouter = require('./server/router/warehouse-route')
app.use(express.json())

app.use('/api/warehouse',warehouseRouter)

app.use('/api/category',categoryRouter)

app.use('/api/user',userRouter)

app.use('/api/product',productRouter)

const start = async () => {
    try{
        await connectionDb
        app.listen(port, () => console.log(`server work on port ${port}`))
    }catch(err){
        console.log(err)
    }
}

start()