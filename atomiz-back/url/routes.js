import CodeGenerator from "../code_generator/index.js";
import * as dao from "./dao.js";

function UrlRoutes(app) {

    const generator = new CodeGenerator(6);

    const getUniqueCode = async () => {
        const code = generator.generateCode();
        let i = 0;
        while (await dao.getRedirect(code)) {
            console.log('code duplicated');
            code = generator.generateCode();
            i++;
            if (i == 5) {
                console.error("Couldn't find a unique code in 5 attempts");
                throw new Error("Running out of codes for this length");
            }
        }
        return code;
    }

    const url_validator = (url) => {
        var REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        return REGEX.test(url);
    }

    const addNewUrl = async (req, res) => {

        console.log(req.body);

        if (!req.body || !req.body.url) {
            res.status(400).json({message: 'must provide a url'});
            return;
        }
        const url = req.body.url;

        if (!url_validator(url)) {
            res.status(400).json({message: 'invalid URL'});
            return;
        }

        const existingRedirect = await dao.getRedirectByUrl(url);
        if (existingRedirect) {
            res.send(existingRedirect);
            return;
        }

        const code = await getUniqueCode();

        const ret = await dao.createRedirect(code, url);
        res.send(ret);
    };

    app.post("/", addNewUrl);

}

function RedirectRoutes(app) {

    const getRedirect = async (req, res) => {
        const { code } = req.params;
        console.log('looking for redirect of: ' + code);
        const data = await dao.getRedirect(code);
        console.log(data);
        if (data) {
            res.redirect(307, data.url);
        }
        else {
            res.status(404).json({message: 'url not found'});
        }

    }

    const getAllRedirects = async (req, res) => {
        res.send(await dao.findAllRedirects());
    }

    app.get("/", (req, res) => {
        res.send('henlo');
    })

    app.get('/redirects', getAllRedirects)

    app.get('/:code', getRedirect);
}

export { UrlRoutes, RedirectRoutes };