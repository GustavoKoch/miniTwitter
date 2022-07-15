const Message = require("../models/Message");

/* GET ALL */
const list_all_messages = async(req, res) => {
 
    try {
      const messages = await Message.find({});
      res.json(messages);
    } catch {
      (error) => console.log(error.message);
    }
  
};

/* CREATE ONE */
const create_one_message = async (req, res) => {
  const { 
    author_id,
    date,
    text,
    likes,
    comment
  
  } = req.body;

  try {
    const newmessage = await Message.create({
      author_id,
      date,
      text,
      likes,
      comment,
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
    const specificmessage = await Message.findById(id);
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
    const updatedMessage = await Message.updateOne(
      { _id: id },
      { [key]: value }
    );
    if (!updatedMessage.modifiedCount)
      return res
        .status(404)
        .send("This Message does not exist, and can not be patched");
    res.send("Message patched succesfully!");
  } catch {
    (error) => console.log(error.Message);
  }
};
/* UPDATE  */
const fullUpdate_one_message = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMessage = await Message.findOneAndUpdate(id, req.body, {
      new: false,
      runValidators: true,
    });
    console.log(updatedMessage);
    if (!updatedMessage)
      return res
        .status(404)
        .send("This Message does not exist, and can not be changed");

    res.json(updatedMessage).send("Message patched succesfully!");
  } catch {
    (error) => console.log(error.Message);
  }
};
/* DELETE */
const delete_one_message = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Message.findOneAndDelete({ _id: id });
    if (!deletedMessage) {
      return res
        .status(404)
        .send("This Message does not exist, and can not be deleted");
    }
    res.json(deletedMessage).send("Message deleted succesfully!");
  } catch {
    (error) => console.log(error.Message);
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

    const deletedManyMessages = await Message.deleteMany({ [key]: value });
    res.json(deletedManyMessages).send("MessageSSS deleted succesfully!");
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