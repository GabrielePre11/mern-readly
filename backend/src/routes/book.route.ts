import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controllers/book.controller";
import { verifyUserRole } from "../middleware/verifyUserRole";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:slug", getSingleBook);

router.post("/create-book", verifyToken, verifyUserRole, createBook);
router.put("/update-book/:id", verifyToken, verifyUserRole, updateBook);
router.delete("/delete-book/:id", verifyToken, verifyUserRole, deleteBook);

export default router;
