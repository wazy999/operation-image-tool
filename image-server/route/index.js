const Router = require('koa-router')
const fs = require("fs")
const imageList = require("../image-list.json")
const router = new Router()
const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "http://39.108.236.220:3001"

router.get("/", async (ctx) => {
   ctx.type = "html"
    ctx.body = `<h1>hello wordld</h1>`
})
router.post("/api/uploadImage", async (ctx) => {
  const headImg = baseUrl + "/image/" + ctx.request.files.file.originalFilename
  ctx.body = {
      code:200,
      data:{headImg},
      msg:'上传成功'
    };
})
router.get("/api/getImageList", async (ctx) => {
  const path = require("path")

  const fileArr = imageList.map(img => ({id:img.id, value:img.value[0]}))
  const result = fileArr.map((file, index) => {
    return {
      path: `${baseUrl}/image/${file.value}`,
      id: file.id,
      name: file.value.split(".")[0],
      price: parseInt(Math.random() * 30000 + 1000) 
    }
  })
  ctx.body = {
    code: 200,
    message: "获取成功",
    result,
  }
})
router.post("/api/getImageById", async (ctx) => {
  const query = ctx.request.body
  let fileArr = imageList.find(img => img.id === query.id)
  if(!fileArr) {
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: "找不到资源",
    }
    return
  }
  const result = fileArr.value.map((file, index) => {
    return {
      path: `${baseUrl}/image/${file}`,
      id: query.id + String(index),
      name: file.split(".")[0],
      price: parseInt(Math.random() * 30000 + 1000) 
    }
  })
  console.log(query)
  ctx.body = {
    code: 200,
    message: "获取成功",
    result: result,
  }
})
module.exports = router