import jwt from"jsonwebtoken";
import asyncHandler from"express-async-handler";
import User from "../models/User.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded?.id)
        req.user = user
        next()
      }
    } catch (error) {
      throw new Error("Not Authorised");
    }
  } else {
    throw new Error("there is no token attached to this header");
  }
});


export const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});



// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   try {
//     let token = req.header("Authorization");

//     if (!token) {
//       return res.status(403).send("Access Denied");
//     }

//     if (token.startsWith("Bearer ")) {
//       token = token.slice(7, token.length).trimLeft();
//     }

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
