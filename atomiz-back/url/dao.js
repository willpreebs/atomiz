import urlModel from "./schema.js";

export const createRedirect = (code, url) => {
    return urlModel.create({_id: code, url});
};

export const getAllRedirects = () => urlModel.find();

export const getRedirect = (code) => urlModel.findById(code);