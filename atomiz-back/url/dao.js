import urlModel from "./schema.js";

export const createRedirect = (code, url) => {
    return urlModel.create({_id: code, url});
};

export const findAllRedirects = () => urlModel.find();

export const getRedirect = (code) => urlModel.findById(code);

export const getRedirectByUrl = (url) => urlModel.findOne({ url });