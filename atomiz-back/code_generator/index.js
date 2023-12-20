import ShortUniqueId from "short-unique-id";

export default class CodeGenerator {

    constructor(length) {
        this.options = { length };
        this.uid = new ShortUniqueId(this.options);
    }

    generateCode() {
        return this.uid.rnd();
    }
}