import { minutesToMilSec } from "./utils/time"

export const LOCAL_PORT = 3000
export const TOKEN_EXPIRY_TIME = minutesToMilSec(15)

interface StringStringObject { [key: string]: string; }

// symbols are substituted for their name in pager code
export const SUB_SYMBOLS_FOR_PAGER_CODE: StringStringObject = {
"-": "0854", // dash
":": "607017", // colon
".": "007" // dot
}