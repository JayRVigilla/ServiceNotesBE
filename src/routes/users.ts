import { Request, Response, NextFunction } from "express";

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

    const newID = uuid();
    const now = new Date(Date.now()).toISOString()

    const passwordHash = await createPasswordHash(raw_password, now, newID);

    const query = await db.query(
      `INSERT INTO users (first_name, last_name, email, username, created_at, id, password_hash)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id`,
      [first_name, last_name, email, username, now, newID, passwordHash]
    );

    const { id } = query.rows[0]

    // TODO: return token
    return res.json({id,passwordHash}).status(201)
  } catch (error) {
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