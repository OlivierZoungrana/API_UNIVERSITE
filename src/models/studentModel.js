import mongoose from "mongoose"

const schema = mongoose.Schema


export const studentSchema = new schema({

    name:{
        type: String,
        required: "votre nom"
    },
    prenom:{
        type: String,
        required: "votre prenom"
    },
    email:{
        type: String,
        required: "votre email"
    },
    password: {
        type:String,
        required: "créer votre password"
    },
    created_at:{
        type: Date,
        default: Date.now
    }

})