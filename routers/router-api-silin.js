/**
 * @fileoverview This file contains all the routes for the tasks assigned to Student #1 (Silin Xu)
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
 * Controller for Events
 * @const
 */
const eventCont = require(path.join(__dirname, '..', 'controllers', 'event-controller.js'));

/**
 * Controller for Category
 * @const
 */
const categoryCont = require(path.join(__dirname, '..', 'controllers', 'category-controller.js'));


/**
 * GET route for /33048126/api/v1/categories
 * @name get/categories
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/categories', async (req, res) => {
    let categories = await categoryCont.getAllCategories();
    res.status(200).json(categories);
})


/**
 * POST route for /33048126/api/v1/add-category
 * @name post/add-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/add-category', async function (req,res){
    let events = [];

    //spit get a feedback of all values as a seperate stirng
    if (req.body.events){
        let eventIds = req.body.events.split(',');
        let event;

        for (let id of eventIds) {
            event = await eventCont.getOneEvent( {id: id} );
            if (!event) {
                continue;
            }

            events.push(event._id);
        }
    }

    let data = {
        name: req.body.name,
        description: req.body.description || undefined,
        image: req.body.image || undefined,
        eventsList: events
    }

    let newCategoryId = await categoryCont.addCategory(data);
    res.status(201).json(newCategoryId)
})

/**
 * DELETE route for /33048126/api/v1/delete-category
 * @name delete/delete-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.delete('/delete-category', async (req, res) => {
    result = await categoryCont.deleteCategory(req.body.categoryId);
    res.status(200).json(result);
})

/**
 * PUT route for /33048126/api/v1/update-category
 * @name put/update-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.put('/update-category', async (req, res) => {
    result = await categoryCont.updateCategory(req.body.categoryId,
         req.body.name, 
         req.body.description);
    res.status(200).json(result);
});


/**
 * Exports this router
 */
module.exports = router;