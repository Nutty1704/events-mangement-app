/**
 * @fileoverview This file contains all the routes for the tasks assigned to Student #2 (Abhijit Upadhyay)
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Router object of express module
 * @const
 */ 
const router = express.Router();

/**
 * path module
 * @const
 */
const path = require('path');

/**
 * Router to serve the API requests
 * @const
 */
const apiRouter = require(path.join(__dirname, 'router-api-abhi.js'));


/**
 * Middleware to pass all requests starting with /api/v1 to apiRouter
 * @function
 * @param {string} path - Express path
 * @param {Router} router - Express Router
 */
router.use('/api/v1', apiRouter);


/**
 * Exports this router
 */
module.exports = router;