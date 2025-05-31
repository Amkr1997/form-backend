const express = require("express");
const {
  addQuestion,
  getAllQUestions,
  deleteDetails,
} = require("../controllers/questions.controllers");
const router = express.Router();

router.post("/add/question", addQuestion);
router.get("/get/all/questions", getAllQUestions);
router.delete("/delete/details/:id", deleteDetails);

module.exports = router;
