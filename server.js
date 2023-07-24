import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';


const app=express();

/*Middleware*/

app.use(express.json());
app.use(cors()); 
app.use(morgan('tiny'));

/*Reduce Fingerprinting*/
app.disable('x-powered-by');

const port=process.env.PORT || 8000;

/**HTTP Get Request */
app.get('/',(req,res)=>{
    res.status(201).json("Home Get Request");
});

/**API Routes */
app.use('/api',router);

/**Start server only when we have valid connection */
connect().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server connected to http://localhost:${port}`);
        }) 
    } catch (error) {
        console.log("Cannot connect to the server")
    }
}).catch(error=>{
    console.log("Invalid database connection...!");
})
