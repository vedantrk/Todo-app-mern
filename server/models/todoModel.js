import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema(
    {
        user: [{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }],
        text:{
            type: String,
            required: true
        },
        done:{
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const Todo = mongoose.model("Todo", todoSchema)

export default Todo;