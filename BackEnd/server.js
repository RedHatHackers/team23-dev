import express from "express";
import userRoute from "./routes/usersRoutes.js";
import  managerRoute from './routes/managerRoute.js'
import  tutorRoute from './routes/tutorRoute.js'
import  moduleRoute from './routes/moduleRoute.js'
import errorHandler from "./middleware/errorMiddleware.js"
import cors from'cors'
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

dotenv.config();
var app = express()
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// ROUTES
app.use("/api/users/", userRoute);
app.use("/api/uploadproof",userRoute);
app.use("/api/tutor", tutorRoute);
app.use("/api/manager", managerRoute);
app.use("/api/module", moduleRoute);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
