import express from "express";
;
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getFeedPosts);
router.get("/:userId/posts", authMiddleware,  getUserPosts);
router.patch("/:id/like", authMiddleware, likePost);


export default router;
