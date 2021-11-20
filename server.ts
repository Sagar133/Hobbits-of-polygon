const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const app = express();
const socketio = require("socket.io");

const PORT = process.env.PORT || 8080;
module.exports = app;

const createApp = () => {
    // logging middleware
    app.use(morgan("dev"));

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // compression middleware
    app.use(compression());

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, "..", "public")));

    // any remaining requests with an extension (.js, .css, etc.) send 404
    app.use((req:any, res:any, next:any) => {
        if (path.extname(req.path).length) {
            const err:any = new Error("Not found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    });

    // sends index.html
    app.use("*", (req:any, res:any) => {
        res.sendFile(path.join(__dirname, "src/index.html"));
    });

    // error handling endware
    app.use((err:any, req:any, res:any, next:any) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || "Internal server error.");
    });
};

const startListening = () => {
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
        console.log(`Mixing it up on port ${PORT}`)
    );
    const io = socketio(server);
    require("./socket")(io);
};

async function bootApp() {
    await createApp();
    await startListening();
}

bootApp();
