const express = require("express");
const router = express.Router();

const {
  list_all_messages,
  find_one_message,
  create_one_message,
  partUpdate_one_message,
  fullUpdate_one_message,
  delete_one_message,
  delete_many_messages
} = require("../controllers/messageController");



router
  .route("/")
  .get(list_all_messages)
  .post(create_one_message)
  .delete(delete_many_messages);
router
  .route("/:id")
  .get(find_one_message)
  .patch(partUpdate_one_message)
  .put(fullUpdate_one_message)
  .delete(delete_one_message);

  module.exports = router;