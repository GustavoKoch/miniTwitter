const User = require("../models/User");
const Message = require("../models/Message");


/* GET ALL */
const list_all_users = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch {
    (error) => console.log(error.message);
  }
};

/* CREATE ONE */
const create_one_user = async (req, res) => {
  const users = req.body;

  try {
    console.log('Creating users')
    const newUser = await User.create(users);
    res.json(newUser);
  } catch {
    (error) => console.log(error.message);
  }
};

/* GET ONE */
/* const find_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const specificUser = await User.findById(id);
    if (!specificUser)
      return res.status(404).send("This user does not exist");
    res.json(specificUser);
  } catch {
    (error) => console.log(error.message);
  }
}; */

const find_one_user = (req, res) => {
  const { id } = req.params;
  try {
    User.findById(id, (err, docs) => {
      if (err) return res.status(404).send("This user does not exist");
      else res.json(docs);
    });
  } catch {
    (error) => console.log(error.message);
  }
};

/* PACTH  */
const partUpdate_one_user = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

  try {
    const updatedUser = await User.updateOne({ _id: id }, { [key]: value });
    if (!updatedUser.modifiedCount)
      return res
        .status(404)
        .send("This user does not exist, and can not be patched");
    res.send("user patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE with PUT */
const fullUpdate_one_user = async (req, res) => {
  const { id } = req.params;
 
  try {
    let updatedUser = await User.findOneAndUpdate( id , req.body, {
      new: true,
      runValidators: true,      
    });
    console.log(updatedUser);
    if (!updatedUser)
      return res
        .status(404)
        .send("This user does not exist, or can not be changed");

    res.json(updatedUser).send("user patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};





/* DELETE */
const delete_one_user = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res
        .status(404)
        .send("This user does not exist, and can not be deleted");
    }
    res.json(deletedUser).send("user deleted succesfully!");
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

    const deletedManyusers = await User.deleteMany({ [key]: value });
    res.json(deletedManyusers).send("userSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};

const find_messages = async (req, res) => {
  // res.send("Hello there!")
  const { id } = req.params;
  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).send("This user hasn't posted yet!");

    const messages = await Message.find({ author_id: user._id })

    res.json({user, messages});
  } catch (error) {
    res.status(500).send(error.message);
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
  find_messages,
};
