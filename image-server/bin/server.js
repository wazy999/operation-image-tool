const koa = require("koa")
const koaStatic = require("koa-static")
const path = require("path")
// const fs = require("fs")
const app = new koa()
const koaResponseData = require("../middleware/koa-response-data")
const koaResponseHeader = require("../middleware/koa-response-header")
app.use(koaResponseHeader)
app.use(koaStatic(path.join(__dirname, "./static")))
app.use(koaResponseData)
app.listen(3001)