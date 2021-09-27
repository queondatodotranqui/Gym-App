import { Schema, model, ObjectId, SchemaTypes } from "mongoose";

interface Record{
    amount:number,
    exer_id: ObjectId
}

const recordSchema = new Schema<Record>({
    amount: { 
        type:Number,
        required:true,
        validate(value:number){
            if(value < 0){
                throw new Error('Amount cant be negative');
            }
        }
    },
    exer_id: { 
        type: SchemaTypes.ObjectId, 
        required:true
    }
}, {
    timestamps:true
})

const recordModel = model<Record>('record', recordSchema);

export { recordModel }