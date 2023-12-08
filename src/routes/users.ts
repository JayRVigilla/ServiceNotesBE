import { Request, Response, NextFunction } from "express";
import { createToken, verifyToken } from "../utils/auth";

const db = require("../db");
const express = require("express");
const router = new express.Router();
const { v4: uuid } = require('uuid');

const {createPasswordHash } = require("./../utils/auth")
/**
 * TODO:
 * - delete hash and save to password
 * - update user
 *
 */


// router.post("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

// create User
router.post("/new", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {first_name, last_name, email, username, raw_password} = req.body

    // TODO: check if email or username exist

    const newID = uuid();
    const now = new Date(Date.now()).toISOString()
    const passwordHash = await createPasswordHash(raw_password, now, newID);
    const user = { first_name, last_name, email, username, id: newID }

    // create new user in users table
    await db.query(
      `INSERT INTO users (first_name, last_name, email, username, created_at, id, password_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [first_name, last_name, email, username, now, newID, passwordHash]
    );

    // create auth token using created_at as the secret
    const newToken = createToken({id: newID, secret: now})
    const responseBody = {token: newToken, user, }
    console.log("users/new", {now})

    verifyToken({id: newID, secret: now, token: newToken})

    return res.json(responseBody).status(201)
  } catch (error: any) {
    console.error(error)
    if (error.status === 500) {
      console.error("500", error.message)
      //
    }
    return next(error);
  }
});

// TODO: GET Users
// router.get("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

// TODO: GET User
// router.get("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

// TODO: UPDATE User
// router.put("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

// TODO: DELETE User
// router.delete("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;