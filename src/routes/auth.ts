import { Request, Response, NextFunction } from "express";

const bcrypt = require("bcrypt");
const database = require("../db");
const express = require("express");
const router = new express.Router();

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

router.post("auth", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await database.query(``);
  } catch (error) {
    return next(error);
  }
});

