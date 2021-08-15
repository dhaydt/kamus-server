// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
import Router from "./routes/routes.js";
import bodyParser from "body-parser";

// init express
const app = express();

// use express json
app.use(express.json());
app.use(bodyParser.json());

// use cors
app.use(cors());

// use router
app.use(Router);

app.listen(3002, () => console.log("Server running at http://localhost:3002"));
