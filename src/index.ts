import express, {NextFunction, Request, Response } from "express"
import { LOCAL_PORT } from "./constants";
import { currentTime } from "./utils/time";
import { generateResponseHeaders } from "./utils/headers";
import { RequestError } from "./types/errors";


const pjson = require('./../package.json');


const app = express()
const port = process.env.PORT || LOCAL_PORT



// process JSON body => req.body
app.use(express.json())

// process traditional form data => req.body
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
  console.info(`*** ${pjson.name} v${pjson.version} listening on ${port} *** `)
})

// 404 handler: matches unmatched routes. logs stacktrace and returns JSON error message.
app.use(function (err: RequestError, _req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message;

  // if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  console.error(status, err.stack)
  return res.status(status).json({ error: { message, status } });
});

app.get("/", (_req: Request, res: Response) => {
  const msg = "** hit / **"
  return res.status(200).json(msg)
})
