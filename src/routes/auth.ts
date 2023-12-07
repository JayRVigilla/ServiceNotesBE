import { Request, Response, NextFunction } from "express";

const db = require("../db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");


const {createPasswordHash } = require("./../utils/auth")
/**
 * TODO:
 * - create hash and save to password
 */


// router.post("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log("auth route1", { req })
    console.log("auth route1", { db })
    const result = await createPasswordHash("rawPwd", "createdDate", "UUID");

    const query = await db.query(
      // `SELECT * FROM USERS`,
      `UPDATE users SET password_hash=$1 WHERE id=$2`,
      [result, "0fa5d6c2-49da-43bc-98db-71f7e6172fbc"]
    );
    console.log("auth route2", { result })
    return res.json(result)
  } catch (error) {
    return next(error);
  }
});

module.exports = router;