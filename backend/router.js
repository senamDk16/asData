const express = require("express")
const cnx = require("./data")
const router = express.Router()
const controller = require("./app.controller")

router.post("/player", controller.addPlayer)
router.get("/player",controller.getAllPlayer)
router.put("/player/:id", controller.putPlayer)
module.exports = router