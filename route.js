const express = require("express");
const chatManager = require('./manager');
const router = express.Router();

router.get("/", async (req, res) => {
	let messages = await chatManager.getAll();
	res.status(200).send(messages);
});

module.exports = router;
