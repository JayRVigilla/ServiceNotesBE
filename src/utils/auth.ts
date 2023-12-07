import { UUID } from "crypto";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12

export const createPasswordHash = async (rawPwd: string, createdDate: string, uuid: UUID) => {

  // console.log("createPasswordHash1", {rawPwd, createdDate, uuid})
  const hash = await bcrypt.hash(createdDate + rawPwd + uuid, SALT_ROUNDS)
  // console.log("createPasswordHash2", {hash})
  return hash
}