const user = require("../models/User");

/* GET ALL */
const list_all_users = async(req, res) => {
 
    try {
      const users = await user.find({});
      res.json(users);
    } catch {
      (error) => console.log(error.message);
    }
  
};

/* CREATE ONE */
const create_one_user = async (req, res) => {
  const { first_name, last_name, class_type } = req.body;

  try {
    const newuser = await user.create({
      first_name,
      last_name,
      class_type,
    });
    res.json(newuser);
  } catch {
    (error) => console.log(error.message);
  }
};

/* GET ONE */
const find_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const specificuser = await user.findById(id);
    if (!specificuser)
      return res.status(404).send("This user does not exist");
    res.json(specificuser);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PACTH  */
const partUpdate_one_user = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

  try {
    const updateduser = await user.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updateduser.modifiedCount)
      return res
        .status(404)
        .send("This user does not exist, and can not be patched");
    res.send("user patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const updateduser = await user.findOneAndUpdate(id, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updateduser);
    if (!updateduser)
      return res
        .status(404)
        .send("This user does not exist, and can not be changed");

    res.json(updateduser).send("user patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteduser = await user.findOneAndDelete({ _id: id });
    if (!deleteduser) {
      return res
        .status(404)
        .send("This user does not exist, and can not be deleted");
    }
    res.json(deleteduser).send("user deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_users = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }

    const deletedManyusers = await user.deleteMany({ [key]: value });
    res.json(deletedManyusers).send("userSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};

module.exports = {
  list_all_users,
  find_one_user,
  create_one_user,
  partUpdate_one_user,
  fullUpdate_one_user,
  delete_one_user,
  delete_many_users,
};