
import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
    _id: {type: String, required: true},
    url: {type: String, required: true},
}, {'collection': 'urls'});

const urlModel = mongoose.model('urls', urlSchema);

export default urlModel;