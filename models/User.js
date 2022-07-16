const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const userSchema = new Schema({
    
                name: {   
                    title: String,
                    first: String,
                    last: String
                },
                username:{type:String, min: 2, max:50, required:true},
                email:{type:String, min: 2, max:50, required:true},            
                picture:{type:String, min: 2, max:50, required:true},
                Age:  { type: Number, min: 1, max: 999 },
                City: {type:String, min: 2, max:50, required:true},
                Description: {type:String, min: 2, max:9999, required:true},
                messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],

    
}, {timestamps:true}
)

//Model is a class and compiles the schema. It contains the blueprint and makes it possible to make queries.
const User=mongoose.model('User', userSchema);

module.exports = User;

/*                 email: {        
                        type: String,
                        trim: true,
                        lowercase: true,
                        unique: true,
                        required: 'Email address is required',
                        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
                }, */