const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const userSchema = new Schema({
    first_name:{type:String, min: 2, max:50, required:true},
    last_name:{type:String, min: 2, max:50, required:true},
    active:{type:Boolean, default:true},
    class_type: {
        type:String,
        enum:['Champion', 'Rocket', 'Psychic', 'Rival']
    }    
}, {timestamps:true}
)

//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const User=mongoose.model('User', userSchema);

module.exports = User;