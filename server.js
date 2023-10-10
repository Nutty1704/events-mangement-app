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
 * ejs module
 * @const
 */
const ejs = require('ejs');

/**
 * Router for Student #2 (Abhijit Upadhyay)
 * @const
 */
const routerAbhi = require(path.join(__dirname, 'routers', 'router-abhi.js'));

/**
 * Router for Student #1 (Silin Xu)
 * @const
 */
const routerSilin = require(path.join(__dirname, 'routers', 'router-silin.js'));

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
 * Event controller
 * @const
 */
const eventCont = require(path.join(__dirname, 'controllers', 'event-controller.js'));


/**
 * Category controller
 * @const
 */
const categoryCont = require(path.join(__dirname, 'controllers', 'category-controller.js'));

/**
 * Stats controller
 * @const
 */
const statsCont = require(path.join(__dirname, 'controllers', 'stat-controller.js'));

/**
 * Exrpress application
 */
let app = express();

app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("images"));
app.use(express.json());
app.engine('html', ejs.renderFile);
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
 * Route serving the home page
 * @name get/
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
app.get('/', async (req, res) => {
    let eventCount = await eventCont.getCount();
    let categoryCount = await categoryCont.getCount();
    let stats = await statsCont.getStats();

    res.render('index', 
    {eventCount: eventCount, 
    categoryCount: categoryCount,
    addCount: stats.recordsCreated,
    deleteCount: stats.recordsDeleted,
    updateCount: stats.recordsUpdated});
});

/**
 * Route serving invalid requests
 * @name get/*
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
app.get("*", function (req, res) {
	res.render("404");
});


/**
 * Express application listening on port 8080
 * @name listen
 * @function
 * @param {number} port - Port number
 * @param {function} callback - Express callback
 */
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

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
