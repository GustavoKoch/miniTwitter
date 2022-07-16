/* var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router; */


const express = require("express");
const router = express.Router();

const {
  list_all_users,
  find_one_user,
  create_one_user,
  partUpdate_one_user,
  fullUpdate_one_user,
  delete_one_user,
  delete_many_users,
  find_messages
} = require("../controllers/userController");



router
  .route("/")
  .get(list_all_users)
  .post(create_one_user)
  .delete(delete_many_users);
router
  .route("/:id")
  .get(find_one_user)
  .patch(partUpdate_one_user)
  .put(fullUpdate_one_user)
  .delete(delete_one_user);
router
.get("/:id/messages", find_messages);

  module.exports = router;