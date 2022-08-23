// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import { AddressInfo } from "net";

// dotenv.config();

// export const app = express();

// app.use(express.json());

// const server = app.listen(process.env.PORT || 3003, () => {
//   if (server) {
//     const address = server.address() as AddressInfo;
//     console.log(`Server is running in http://localhost:${address.port}`);
//   } else {
//     console.error(`Failure upon starting server.`);
//   }
// });
// import express, { Express } from "express"
// import Knex from "knex"
// import cors from "cors"
// import { AddressInfo } from "net"
// export const app:Express = express()

// app.use(express.json())
// app.use(cors())

// const server = app.listen(process.env.PORT || 3003,()=>{
//     if(server){
//         const address = server.address() as AddressInfo;
//         console.log(`Server is running http://localhost:${address.port}`)

//     }else{
//         console.error(`Failure upon starting server`)
//     }
// })

import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'

const app = express()

app.use(express.json())
app.use(cors())

// app.listen(3003, ()=>{
//     console.log('Servidor rodando na porta 3003')
// })

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})


export default app

