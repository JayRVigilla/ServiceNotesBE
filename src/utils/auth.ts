import { UUID } from "crypto";
import { SUB_SYMBOLS_FOR_PAGER_CODE, TOKEN_EXPIRY_TIME } from "../constants";

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12

const jwt = require('jsonwebtoken');

interface ComplexStringData {
  text: string;
  created_at: string; // Date.toISOString()
  uuid: UUID
}

const useComplexString = ({ text, created_at, uuid }: ComplexStringData): string => {
  // convert String to Array, reverse it, then convert back to string
  const reversed = `${created_at}${text}${uuid}`.split("").reverse()

  let string = ''
  // only taking characters if index is evenly divisible by 3, 7, 11
  reversed.forEach((char, i) => {
    if (!(i % 7) || !(i % 3) || !(i % 11)) {
      // if the character is a symbol, use pager code of the symbol name
      string = string + (SUB_SYMBOLS_FOR_PAGER_CODE[char] ? SUB_SYMBOLS_FOR_PAGER_CODE[char] : char)
    }
  })
  return string
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
  secret: string | undefined;
}

interface VerifyTokenData extends CreateTokenData {
  secret: string;
  token: string;
}

// using created_at as secret, will be ISO string
export const createToken = ({ id, secret }: CreateTokenData) => {
  try {
    const data = { id };
    const createdAtNumber = new Date(secret ?? Date.now()).valueOf()
    const token = jwt.sign({data, exp: createdAtNumber + TOKEN_EXPIRY_TIME/1000}, secret);

    console.log("createToken", { token, id, secret, exp: createdAtNumber + TOKEN_EXPIRY_TIME/1000 })

    return token;
  } catch (error) {
    console.error(`createToken: ${error}`)
  }
}

export const verifyToken = ({ id, secret, token }: VerifyTokenData) => {
  try {
    // const secretDate = new Date(new Date(Date.now()).setFullYear(2025)).toISOString()
    //  !! currently, if invalid (ie after expiry date, then JWTError)
    const decoded = jwt.verify(token, secret)
    // console.log("verifyToken:\n", decoded)
    // console.log("verifyToken2:\n", {iat: new Date(decoded.iat), exp: new Date(decoded.exp)})
        /**
     * verifyToken:
          {
            data: { id: '3f882fbc-dea2-4fb3-9f7f-7789e80bd5f6' },
            // JS Date (ms after Epoch)
            exp: 1702077508378,
            // Unix time (sec after Epoch)
            iat: 1702077507
          }
     */

    const { data: { id }, exp } = decoded


    // TODO: if expired, create a new one?
    return decoded.data.id === id
  } catch (error) {
  console.error(`verifyToken: ${error}`)
  }
}