const message = require("../models/message");

/* GET ALL */
const list_all_messages = async(req, res) => {
 
    try {
      const messages = await message.find({});
      res.json(messages);
    } catch {
      (error) => console.log(error.message);
    }
  
};

/* CREATE ONE */
const create_one_message = async (req, res) => {
  const { first_name, last_name, class_type } = req.body;

  try {
    const newmessage = await message.create({
      first_name,
      last_name,
      class_type,
    });
    res.json(newmessage);
  } catch {
    (error) => console.log(error.message);
  }
};

/* GET ONE */
const find_one_message = async (req, res) => {
  const { id } = req.params;
  try {
    const specificmessage = await message.findById(id);
    if (!specificmessage)
      return res.status(404).send("This message does not exist");
    res.json(specificmessage);
  } catch {
    (error) => console.log(error.message);
  }
};

/* PACTH  */
const partUpdate_one_message = async (req, res) => {
  const { id } = req.params;
  const { key, value } = req.body;

  try {
    const updatedmessage = await message.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedmessage.modifiedCount)
      return res
        .status(404)
        .send("This message does not exist, and can not be patched");
    res.send("message patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* UPDATE  */
const fullUpdate_one_message = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedmessage = await message.findOneAndUpdate(id, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updatedmessage);
    if (!updatedmessage)
      return res
        .status(404)
        .send("This message does not exist, and can not be changed");

    res.json(updatedmessage).send("message patched succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE */
const delete_one_message = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedmessage = await message.findOneAndDelete({ _id: id });
    if (!deletedmessage) {
      return res
        .status(404)
        .send("This message does not exist, and can not be deleted");
    }
    res.json(deletedmessage).send("message deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};
/* DELETE MANY */
const delete_many_messages = async (req, res) => {
  const { key, value } = req.body;
  console.log(key);
  try {
    if (!key || !value) {
      return res.status(404).send("Provide a valid key-value pair!!");
    }

    const deletedManymessages = await message.deleteMany({ [key]: value });
    res.json(deletedManymessages).send("messageSSS deleted succesfully!");
  } catch {
    (error) => console.log(error.message);
  }
};

module.exports = {
  list_all_messages,
  find_one_message,
  create_one_message,
  partUpdate_one_message,
  fullUpdate_one_message,
  delete_one_message,
  delete_many_messages,
};