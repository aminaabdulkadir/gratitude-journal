const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const journalRoute = require("./routes/journal");


dotenv.config();

mongoose.connect( process.env.MONGODB_URL
    ).then(()=>console.log("DB connection is successfull")).catch((err)=>{console.log(err)})

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)
app.use("/api/journals", journalRoute);


app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running`)
});



