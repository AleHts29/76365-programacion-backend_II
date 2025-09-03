import express from 'express';
import routerProduct from './routes/product.router.js'


const app = express();
app.use(express.json())
const PORT = 8080;


// API
app.use('/api', routerProduct)



app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})


