import express from "express";
import { verifyToken } from "../middleware/verifyToken";

import { verifyUserRole } from "../middleware/verifyUserRole";
import {
  createGenre,
  getAllGenres,
  getSingleGenre,
} from "../controllers/genre.controller";

const router = express.Router();

router.get("/", getAllGenres);
router.get("/:slug", getSingleGenre);

router.post("/create-genre", verifyToken, verifyUserRole, createGenre);

export default router;
