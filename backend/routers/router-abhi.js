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
 * GET route for /abhijit/add-event
 * @name get/add-event
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/add-event', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-event.html'));
});


/**
 * POST route for /abhijit/add-event
 * @name post/add-event
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/add-event', async (req, res) => {
    let categories = [];
    let category;

    for (let id of req.body.categoryIds.split(',')) {
        // TODO: REPLACE WITH SILIN'S CONTROLLER
        category = await categoryCont.getOneCategory({ id: id });
        if (category) {
            categories.push(category._id);
        }
    }

    // extracts data from the request body for a new Event object.
    let data = {
        name: req.body.name,
        startDateTime: req.body.startDateTime,
        duration: req.body.duration,
        description: req.body.description || undefined,
        capacity: req.body.capacity || undefined,
        ticketsAvailable: req.body.ticketsAvailable || undefined,
        isActive: req.body.isActive == 'on',
        image: req.body.image || undefined,
        categoryList: categories
    }

    try {
        await eventCont.addEvent(data);
        // redirects to /abhijit/events
        res.redirect('/abhijit/events');
    } catch (err) {
        let errorMessages = [];
        for (let key of Object.keys(err.errors)) {
            errorMessages.push(err.errors[key].message);
        }

        let errorStatus = {message: errorMessages.join(', ')};
        res.send(errorStatus);
    }

});


/**
 * GET route for /abhijit/events
 * @name get/events
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/events', async (req, res) => {
    const EVENTS = await eventCont.getAllEvents();

    addCategoryIds(EVENTS);

    // renders the events-list page with the EVENTS array
    res.render('events-list', { events: EVENTS, soldOut: false });
})


/**
 * GET route for /abhijit/sold-out-events
 * @name get/sold-out-events
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/sold-out-events', async (req, res) => {
    // gets the events with ticketsAvailable = 0
    let soldOutEvents = await eventCont.getEvents( { ticketsAvailable: 0} );

    addCategoryIds(soldOutEvents);
    // renders the events-list page with the sold out events
    res.render('events-list', { events: soldOutEvents, soldOut: true });
});


/**
 * GET route for /abhijit/event-detail
 * @name get/event-detail
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/event/remove', async (req, res) => {
    // gets the id of the event to be removed from the query string
    let id = req.query.id;

    // if the id is not provided, render the remove-event page
    if (id === undefined || id === '') {
        res.sendFile(path.join(__dirname, '..', 'views', 'remove-event.html'));

    } else {
        await eventCont.deleteEvent(id);

        // redirects to /abhijit/events
        res.redirect('/abhijit/events');
    }
});

/**
 * GET route for /abhijit/event-detail
 * @name get/event-detail
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/category/:id', async (req, res) => {
    const category = await categoryCont.getOneCategory( {id: req.params.id} );

    if (!category) {
        res.render('category-not-found');
    } else {
        const EVENTS = await eventCont.getAllEvents();

        // filters the events that have the category in their categoryList
        let filteredEvents = [];

        for (let event of EVENTS) {
            for (let category of event.categoryList) {
                if (category.id == req.params.id) {
                    filteredEvents.push(event);
                    break;
                }
            }
        }

        addCategoryIds(filteredEvents);

        // renders the category-detail page with the filtered events and the category object
        res.render('category-detail', { events: filteredEvents, category: category });
    }
})


/**
 * Function to add categoryIds to the EVENTS array as a string
 * @function
 * @param {Array} EVENTS - Array of Event objects
 * @returns {void}
 */
function addCategoryIds(EVENTS) {
    let categoryIds;
    
    for (let event of EVENTS) {
        categoryIds = '';
        for (let category of event.categoryList) {
            categoryIds += category.id + ',';
        }
        event.categories = categoryIds.substring(0, categoryIds.length - 1);
    }
}


/**
 * Exports this router
 */
module.exports = router;