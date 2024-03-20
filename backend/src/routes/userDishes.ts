import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Dish, { DishType } from "../models/dish";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const imageStorage = multer.memoryStorage();
const image = multer({
  storage: imageStorage,
  limits: {
    // 5 mb
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("name is required."),
    body("description").notEmpty().withMessage("description is required."),
    body("spiceLevel").notEmpty().withMessage("spiceLevel is required."),
    body("prepTime").notEmpty().withMessage("prepTime is required."),
    body("category").notEmpty().withMessage("category is required."),
    body("allergens").notEmpty().withMessage("allergens is required."),
    body("imageFiles").notEmpty().withMessage("image(s) is required."),
  ],
  image.array("imageFiles", 5),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newDish: DishType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;

        const cloudinaryUpload = await cloudinary.v2.uploader.unsigned_upload(
          dataURI,
          "dishApp"
        );
        return cloudinaryUpload.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      newDish.imageUrls = imageUrls;
      newDish.lastUpdated = new Date();
      newDish.userId = req.userId;

      const dish = new Dish(newDish);
      await dish.save();

      res.status(201).send(dish);
    } catch (error) {
      console.log("Error creating dish: ", error);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

export default router;
