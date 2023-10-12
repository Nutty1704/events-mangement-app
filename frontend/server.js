/**
 * FIT2095 Assignment 2
 * @author Abhijit Upadhyay <aupa0004@student.monash.edu>
 * @author Silin Xu <sxuu0072@student.monash.edu>
 */

/** A simple Event Management System that allows users to create, view, categorize and remove events.
 * @requires Express
 * @requires ejs
 * @requires randomstring
 * @requires mongoose
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * path module
 * @const
 */
const path = require('path');


/**
 * Router for Student #2 (Abhijit Upadhyay)
 * @const
 */
const routerAbhi = require(path.join(__dirname, 'backend' ,'routers', 'router-abhi.js'));

/**
 * Router for Student #1 (Silin Xu)
 * @const
 */
const routerSilin = require(path.join(__dirname, 'backend' ,'routers', 'router-silin.js'));

/**
 * Port number
 * @const
 */
const PORT = 8080;

/**
 * mongoose module
 * @const
 */
const mongoose = require('mongoose');

/**
 * URL to connect to the database
 * @const
 */
const url = 'mongodb://127.0.0.1:27017/assignment2';

/**
 * Stats controller
 * @const
 */
const statsCont = require(path.join(__dirname, 'backend' ,'controllers', 'stat-controller.js'));

/**
 * Exrpress application
 */
let app = express();

/**
 * Server
 * @const
 */
const server = require('http').Server(app);

/**
 * Socket.io
 * @const
 */
const io = require("socket.io")(server);

/**
 * Google Translate
 * @const
 */
const {Translate} = require('@google-cloud/translate').v2;

/**
 * Tranlate Client
 * @const
 */
const translate = new Translate();


app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'backend', 'images')));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist', 'frontend')));
app.set('view engine', 'html');

/**
 * Middleware to pass all requests starting with /abhijit to routerAbhi
 * @function
 * @param {string} path - Express path
 * @param {Router} router - Express Router
 */
app.use('/abhijit', routerAbhi);

/**
 * Middleware to pass all requests starting with /33048126 to routerSilin
 * @function
 * @param {string} path - Express path
 * @param {Router} router - Express Router
 */
app.use('/33048126', routerSilin);

/**
 * Socket.io connection
 * @function
 * @param {string} connection - Socket.io connection event
 * @param {function} callback - Socket.io callback
 */
io.on("connection", function(socket) {

    socket.on("translate", async (data) => {
        const [translation] = await translate.translate(data.text, data.target);
        socket.emit("translated", translation);
    })
    
})

/**
 * Express application listening on port 8080
 * @name listen
 * @function
 * @param {number} port - Port number
 * @param {function} callback - Express callback
 */
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

/**
 * A function to connect to the database
 * @name connect
 * @function
 * @async
 * @param {String} url 
 * @returns {String} - A string indicating the success of the connection
 */
async function connect(url) {
    await mongoose.connect(url);
    await statsCont.instantiate();
    return "Connected Successfully"
}

/**
 * Connects to the database
 */
connect(url).then(console.log).catch((err) => console.log(err));
