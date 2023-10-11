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
 * Category Controller
 * @const
 */
const categoryCont = require(path.join(__dirname, "..", 'controllers', 'category-controller.js'));

/**
 * Event Controller
 * @const
 */
const eventCont = require(path.join(__dirname, "..", 'controllers', 'event-controller.js'));

/**
 * Router to serve API requests
 * @const
 */
const apiRouter = require(path.join(__dirname, 'router-api-silin.js'));

/**
 * Middleware to pass all requests starting with /api/v1 to apiRouter
 * @function
 * @param {string} path - Express path
 * @param {Router} router - Express Router
 */
router.use('/api/v1', apiRouter);


/**
 * GET route for /33048126/event-category
 * @name get/event-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get("/event-category", async function (req, res) {
    const CATEGORIES = await categoryCont.getAllCategories();
	res.render('category-list', {categories: CATEGORIES, filtered: false, keyword: ""})

});


/**
 * GET route for /33048126/add-category
 * @name get/add-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/add-category',function (req,res){
    res.sendFile(path.join(__dirname, '..', 'views','category-add.html'))
})

/**
 * POST route for /33048126/add-category
 * @name post/add-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/add-category',async function (req,res){
    let data = {
        name: req.body.name,
        description: req.body.description || undefined,
        image: req.body.image || undefined
    }

    await categoryCont.addCategory(data);
    res.redirect('/33048126/event-category');
})

/**
 * GET route for /33048126/delete-category
 * @name get/delete-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get("/delete-category", function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'views', 'category-delete.html'));

});


/**
 * POST route for /33048126/delete-category
 * @name post/delete-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post("/delete-category", async function (req, res) {
    await categoryCont.deleteCategory(req.body.categoryID)
    res.redirect("/33048126/event-category");
});


/**
 * GET route for /33048126/search-category
 * @name get/search-category
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get("/search-category", async (req,res) => {
    //set the keywords all to lowercase
    let keyword = req.query.keyword;

    if (keyword === undefined || keyword === '') {
        res.sendFile(path.join(__dirname, '..', 'views', 'search-category.html'));
    } else {

        let filtered_categories = [];
        let CATEGORIES = await categoryCont.getAllCategories();
        let desc;
        let words;

        // filtering out category objects that have keyword in their description
        for (let i = 0; i < CATEGORIES.length; i++) {
        desc = CATEGORIES[i].description.toLowerCase();

        // splitting the description into words
        words = desc.split(" ");
            for (let w of words) {
                if (w === keyword.toLowerCase()){
                    //push = add
                    filtered_categories.push(CATEGORIES[i]);
                }
            }
        }

       res.render('category-list', {categories: filtered_categories, filtered: true, keyword: ": " + keyword});
    }
})

/**
 * GET route for /33048126/event/:id
 * @name get/event/event/:id
 * @function
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/event/:id',async function (req,res){
    let id = req.params.id;
    let event = await eventCont.getOneEvent( {id: id} );

    if (event === null) {
        res.render('event-not-found')
    } else {
        addCategoryId(event);
        res.render('event-show', { event: event });
    }
})

/**
 * Function to add categoryIds to the Event
 * @function
 * @param {Array} event - an Event Object
 * @returns {void}
 */
function addCategoryId(event) {
    let categoryIds = "";
    
    for (let category of event.categoryList) {
            categoryIds += category.id + ',';
    }
    event.categories = categoryIds.substring(0, categoryIds.length - 1);
}


/**
 * Exports this router
 */
module.exports = router;