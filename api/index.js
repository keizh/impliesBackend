require("dotenv").config();
const express = require(`express`);
const mongoose = require(`mongoose`);
const cors = require(`cors`);
const dbConnect = require("../db/dbConnect");
const UserRouter = require("../routes/UserRoutes");
const CampanyRouter = require("../routes/CampanyRoutes");
dbConnect();
const app = express();

app.use(
  cors({
    origin: "https://implies-frontend.vercel.app",
    methods: ["PUT", "PATCH", "GET", "POST", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
    // credentials:true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/campany", CampanyRouter);

app.get("/work", (req, res) => {
  res.status(200).send(`working`);
});

app.listen(process.env.PORT || 5500, () => console.log(`Server is online`));
