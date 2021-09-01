// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
import Router from "./routes/routes.js";
import bodyParser from "./node_modules/body-parser/index.js";

import { join, dirname } from "path";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
// init express

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static("public"));
// use express json
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use(fileUpload());
// use cors
app.use(cors());

// use router
app.use(Router);

app.listen(3002, () => console.log("Server running at http://localhost:3002"));
