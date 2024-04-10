import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Dish from "../models/dish";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { DishType } from "../shared/types";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

const imageStorage = multer.memoryStorage();
const image = multer({
  storage: imageStorage,
  limits: {
    // 5 mb
    fileSize: 5 * 1024 * 1024,
  },
});

// create new dish
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("name is required."),
    body("description").notEmpty().withMessage("description is required."),
    body("spiceLevel").notEmpty().withMessage("spiceLevel is required."),
    body("prepTime").notEmpty().withMessage("prepTime is required."),
    body("category").notEmpty().withMessage("category is required."),
    body("allergens"),
    body("ingredients").notEmpty().withMessage("ingredients are required."),
    body("instructions").notEmpty().withMessage("instructions are required."),
    body("imageFile").notEmpty().withMessage("an image is required."),
  ],
  image.array("imageFile", 1),
  async (req: Request, res: Response) => {
    try {
      const imageFile = req.files as Express.Multer.File[];

      const {
        name,
        description,
        spiceLevel,
        prepTime,
        category,
        allergens,
        ingredients,
        instructions,
      } = req.body;

      const parsedAllergens = JSON.parse(allergens);
      const parsedIngredients = JSON.parse(ingredients);
      const parsedInstructions = JSON.parse(instructions);

      const imageUrl = await uploadImage(imageFile[0]);

      const newDish: Partial<DishType> = {
        name,
        description,
        spiceLevel,
        prepTime,
        category,
        allergens: parsedAllergens,
        ingredients: parsedIngredients,
        instructions: parsedInstructions,
        imageUrl,
        lastUpdated: new Date(),
        userId: req.userId,
      };

      const dish = new Dish(newDish as DishType);
      await dish.save();

      res.status(201).send(dish);
    } catch (error) {
      console.log("Error creating dish: ", error);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

// get all dishes from the user.
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const userDishes = await Dish.find({ userId: req.userId });
    res.json(userDishes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dishes." });
  }
});

// get dish by id.
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const dish = await Dish.findOne({ _id: id, userId: req.userId });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dish." });
  }
});

// update existing dish.
router.put(
  "/:dishId",
  verifyToken,
  image.array("imageFile"),
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        description,
        spiceLevel,
        prepTime,
        category,
        allergens,
        ingredients,
        instructions,
        imageUrl,
        userId,
      } = req.body;

      const imageFile = req.files as Express.Multer.File[];

      const parsedAllergens = JSON.parse(allergens);
      const parsedIngredients = JSON.parse(ingredients);
      const parsedInstructions = JSON.parse(instructions);

      const updatedDish: Partial<DishType> = {
        name,
        description,
        spiceLevel,
        prepTime,
        category,
        allergens: parsedAllergens,
        ingredients: parsedIngredients,
        instructions: parsedInstructions,
        imageUrl,
        lastUpdated: new Date(),
        userId,
      };

      const dish = await Dish.findOneAndUpdate(
        {
          _id: req.params.dishId,
          userId: req.userId,
        },
        updatedDish,
        { new: true }
      );

      if (!dish) {
        return res.status(404).json({ message: "Dish not found." });
      }

      if (imageFile[0] !== undefined) {
        const imageFile = req.files as Express.Multer.File[];
        const updatedImageUrl = await uploadImage(imageFile[0]);

        await deleteImage(dish.imageUrl);

        dish.imageUrl = updatedImageUrl;
        await dish.save();
      }

      res.status(201).json(dish);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

async function uploadImage(imageFile: Express.Multer.File) {
  const b64 = Buffer.from(imageFile.buffer).toString("base64");
  let dataURI = "data:" + imageFile.mimetype + ";base64," + b64;

  const cloudinaryUpload = await cloudinary.v2.uploader.unsigned_upload(
    dataURI,
    "dishApp"
  );
  return cloudinaryUpload.url;
}

async function deleteImage(imageUrl: string) {
  const regex = /\/dishApp\/([a-zA-Z0-9]+)\.\w+/i;
  const match = imageUrl.match(regex);
  const formattedImageUrl = "dishApp/" + match![1];

  cloudinary.v2.api
    .delete_resources([formattedImageUrl], {
      type: "upload",
      resource_type: "image",
    })
    .then(console.log);
}

export default router;
