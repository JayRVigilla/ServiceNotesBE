import { Request, Response, NextFunction } from "express";

const db = require("../db");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");


const {createPasswordHash } = require("./../utils/auth")

/**
 * TODO:
 * - login (create & give token)
 * - logout (remove token)
 */


// router.post("", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

// TODO: LOGIN
// router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

// TODO: LOGOUT
// router.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = await database.query(``);
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = router;