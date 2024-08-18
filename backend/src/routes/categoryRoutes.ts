import { Router } from "express";
import { getCategories } from "../controllers/categoriesController";

const router = Router();

router.use((req,res,next) => {
    console.log(req.method, req.originalUrl);
    next();
  })

router.get("/", getCategories);

export default router;
