import express, { Request, Response } from "express";
import Dish from "../models/dish";
import { DishSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = filteringQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "spiceLevelAsc":
        sortOptions = { spiceLevel: 1 };
        break;

      case "spiceLevelDes":
        sortOptions = { spiceLevel: -1 };
        break;

      case "prepTimeAsc":
        sortOptions = { prepTime: 1 };
        break;

      case "prepTimeDes":
        sortOptions = { prepTime: -1 };
        break;
    }

    const pageSize = 6;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const pageSkip = (pageNumber - 1) * pageSize;

    const dishes = await Dish.find(query)
      .sort(sortOptions)
      .skip(pageSkip)
      .limit(pageSize);

    const total = await Dish.countDocuments();

    const response: DishSearchResponse = {
      data: dishes,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong." });
  }
});

const filteringQuery = (queryParams: any) => {
  let filteringQuery: any = {};

  if (queryParams.name) {
    filteringQuery.name = {
      $in: new RegExp(queryParams.name, "i"),
    };
  }

  if (queryParams.category) {
    filteringQuery.category = {
      $in: Array.isArray(queryParams.category)
        ? queryParams.category
        : [queryParams.category],
    };
  }

  if (queryParams.spiceLevel) {
    filteringQuery.spiceLevel = {
      $in: Array.isArray(queryParams.spiceLevel)
        ? queryParams.spiceLevel
        : [queryParams.spiceLevel],
    };
  }

  if (queryParams.prepTime) {
    filteringQuery.prepTime = {
      $in: Array.isArray(queryParams.prepTime)
        ? queryParams.prepTime
        : [queryParams.prepTime],
    };
  }

  if (queryParams.allergens) {
    filteringQuery.allergens = {
      $nin: Array.isArray(queryParams.allergens)
        ? queryParams.allergens
        : [queryParams.allergens],
    };
  }

  return filteringQuery;
};

export default router;
