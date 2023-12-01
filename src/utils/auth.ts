import { UUID } from "crypto";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12

export const createPasswordHash = (rawPwd: string, createdDate: string, uuid: UUID) => {
  return bcrypt.hash(rawPwd, createdDate+uuid)
}