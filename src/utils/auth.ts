import { UUID } from "crypto";
import { TOKEN_EXPIRY_TIME } from "../constants";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12

const jwt = require('jsonwebtoken');

interface ComplexStringData {
  text: string;
  created_at: string; // Date.toISOString()
  uuid: UUID
}

const useComplexString = ({text, created_at, uuid} : ComplexStringData) => {
return created_at + text + uuid
}

export const createPasswordHash = async (rawPwd: string, createdDate: string, uuid: UUID) => {
  const data: ComplexStringData = {
    text: rawPwd,
    created_at: createdDate,
    uuid
  }

  const hash = await bcrypt.hash(useComplexString(data), SALT_ROUNDS)
  return hash
}

interface CreateTokenData {
  id: string;
  secret: string
}

export const createToken = ({ id, secret }: CreateTokenData) => {
  const data = { id };
  const token = jwt.sign(data, secret, ({ expiresIn: TOKEN_EXPIRY_TIME }));
  return token;
}