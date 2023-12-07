import { UUID } from "crypto";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12

export const createPasswordHash = async (rawPwd: string, createdDate: string, uuid: UUID) => {
  const hash = await bcrypt.hash(createdDate + rawPwd + uuid, SALT_ROUNDS)
  return hash
}