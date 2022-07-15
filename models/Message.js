const mongoose =require('mongoose');

const Schema=mongoose.Schema;

/* const comments = new Schema({ body: String }); */

const messageSchema = new Schema({
            author_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
            date: { type: Date, default: Date.now },
            text:{type:String, min: 2, max:5000, required:true},
            likes: { type: Number, min: 18, max: 999 },
            comments: [String]
   
}, {timestamps:true}
)

//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const Message=mongoose.model('Message', messageSchema);

module.exports = Message;