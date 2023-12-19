import ShortUniqueId from "short-unique-id";


export default function generateUrlId(url) {

    const options = {length: 6};

    const uid = new ShortUniqueId(options);

    return uid.rnd();
}