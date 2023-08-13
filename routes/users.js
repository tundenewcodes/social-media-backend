import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';



router.route('/:id')
.get(authMiddleware, getUser)

router.route('/:id/friends')
.get(authMiddleware, getUserFriends)

router.route('/:id/:friendId')
.patch(authMiddleware, addRemoveFriend)



export default router