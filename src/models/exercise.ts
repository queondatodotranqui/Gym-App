import { Schema, model, ObjectId, SchemaTypes } from "mongoose";

type ExerciseType = 'Upper' | 'Middle' | 'Lower'

interface Exercise{
    name:string,
    type: ExerciseType,
    owner: ObjectId
}

const exerciseSchema = new Schema<Exercise>({
    name: { 
        type: String, 
        required:true,
        minlength: 5
    },
    type: { 
        type: String, 
        required:true,
        minlength: 4
    },
    owner: { 
        type: SchemaTypes.ObjectId, 
        required:true
    }
}, {
    timestamps:true
})

const exerciseModel = model<Exercise>('exercise', exerciseSchema);

module.exports = {
    exerciseModel
}