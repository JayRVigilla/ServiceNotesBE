import express, {Request, Response } from "express"
import { LOCAL_PORT } from "./constants";

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

app.get("/", (req: Request, res: Response) => {
  return res.send(" ** hit / ** ")
})
