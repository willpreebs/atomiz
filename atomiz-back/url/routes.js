import generateUrlId from "../code_generator/index.js";
import * as dao from "./dao.js";

function UrlRoutes(app) {

    const addNewUrl = async (req, res) => {

        console.log(req.body);

        if (!req.body || !req.body.url) {
            res.status(400).json({message: 'must provide a url'});
            return;
        }
        const url = req.body.url;

        const code = generateUrlId(url);
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

    const getAllRedirects = (req, res) => {
        res.send(dao.getAllRedirects());
    }

    app.get("/", (req, res) => {
        res.send('henlo');
    })

    app.get('/redirects', getAllRedirects)

    app.get('/:code', getRedirect);
}

export { UrlRoutes, RedirectRoutes };