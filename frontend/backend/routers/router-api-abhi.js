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
 * Controller for Event
 * @const
 */
const eventCont = require(path.join(__dirname, '..', 'controllers', 'event-controller.js'));

/**
 * Controller for Category
 * @const
 */
const categoryCont = require(path.join(__dirname, '..', 'controllers', 'category-controller.js'));

/**
 * Controller for Stats
 * @const
 */
const statsCont = require(path.join(__dirname, '..', 'controllers', 'stat-controller.js'));

/**
 * POST route for /abhijit/api/v1/add-event
 * @name post/add-event
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/add-event', async (req, res) => {

    let categoryIds = req.body.categories.split(',');
    let categories = [];
    let category;

    for (let id of categoryIds) {
        category = await categoryCont.getOneCategory({ id: id });
        if (category) {
            categories.push(category._id);
        }
    }

    let data = {
        name: req.body.name,
        startDateTime: req.body.startDateTime,
        duration: req.body.duration,
        categories: categories,
        description: req.body.description,
        capacity: req.body.capacity,
        ticketsAvailable: req.body.ticketsAvailable,
        isActive: req.body.isActive,
        image: req.body.image,
        categoryList: categories
    }

    try {
        newEventId = await eventCont.addEvent(data);
        res.status(201).json({eventId: newEventId});
    } catch (err) {
        let errorStatus = getErrorMessages(err);
        res.status(400).json(errorStatus);
    }

})

/**
 * GET route for /abhijit/api/v1/events
 * @name get/events
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/events', async (req, res) => {
    try {
        let events = await eventCont.getAllEvents();
        res.status(200).json(events);
    } catch (err) {
        res.status(400).json(err);
    }
})

/**
 * DELETE route for /abhijit/api/v1/delete-event
 * @name delete/delete-event
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.delete('/delete-event', async (req, res) => {
    try {
        result = await eventCont.deleteEvent(req.body.eventId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
})

/**
 * PUT route for /abhijit/api/v1/update-event
 * @name put/update-event
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.put('/update-event', async (req, res) => {
    result = await eventCont.updateEvent(req.body.eventId, req.body.name, req.body.capacity);

    if (result.status !== 'update failed') {
        res.status(200).json(result);
    } else {
        res.status(400).json(result);
    }
});

/**
 * GET route for /abhijit/api/v1/get-stats
 * @name get/get-stats
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/get-stats', async (req, res) => {
    try{
        result = await statsCont.getStats();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
})

/**
 * GET route for /abhijit/api/v1/get-event/:id
 * @name get/get-event/:id
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/get-event/:id', async (req, res) => {
    let event =  await eventCont.getOneEvent({ id: req.params.id });
    if (event) {
        res.status(200).json(event);
    } else {
        res.status(400).json({message: 'Event not found'});
    }
})


function getErrorMessages(err) {
    let errorMessages = [];
    for (let key of Object.keys(err.errors)) {
        errorMessages.push(err.errors[key].message);
    }

    let errorStatus = {message: errorMessages.join(', ')};
    return errorStatus;
}

/**
 * Exports this router
 */
module.exports = router;
