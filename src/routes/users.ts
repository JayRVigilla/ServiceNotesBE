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
    // const newToken = createToken({id: newID, secret: now})
    // const responseBody = {token: newToken, user, }
    // console.log("users/new", {now})

    const responseBody = {user}

    // const verified = verifyToken({ id: newID, secret: now, token: newToken })
    // console.log("/new/user", verified)

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
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await db.query(
      `SELECT u.id,
              u.username,
              u.first_name,
              u.last_name,
              u.email
      FROM Users u
      WHERE u.id = $1
      `, [req.params.id]
    )
    return res.json(result.rows[0]).status(200)
  } catch (error) {
    return next(error);
  }
});

// TODO: UPDATE User
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, username, email, phone_number, address, city, state, zip_code, img_url } = req.body;

    const currentData = await db.query(
      `SELECT first_name,
      last_name,
      username,
      email,
      phone_number,
      address,
      city,
      state,
      zip_code,
      img_url

      FROM Users u
      WHERE u.id = $1
      `, [req.params.id])

    // fill in undefined values of req.body with current values
    for (let key in req.body) {
      if(!key) req.body[key] = currentData[key]
    }

    const currentTime = new Date(Date.now()).toISOString()

    const result = await db.query(
      `UPDATE Users SET first_name=$1, last_name=$2, username=$3, email=$4, phone_number=$5, address=$6, city=$7, state=$8, zip_code=$9, img_url=$10, updated_at=$11
    `, [first_name, last_name, username, email, phone_number, address, city, state, zip_code, img_url, currentTime]);

    return res.json(result.rows[0])
  } catch (error) {
    return next(error);
  }
});

// TODO: DELETE User
// router.delete("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;