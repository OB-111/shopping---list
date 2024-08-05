import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import cors from "cors";
import { sequelize } from "./models";
import path from "path";

const _dirname = path.dirname("");
const buildPath = path.join(_dirname,'../frontend/build')
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use(express.static(buildPath));

app.get("/*",function(req:Request,res:Response){
  res.sendFile(path.join(_dirname,'../frontend/build/index.html'),function(err){
    if(err){
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });
