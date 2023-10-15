/**
 * @fileOverview  category-controller.js
 * @description Controller for Category
 * @author Silin Xu
 */

/**
 * path module
 * @const
 */
const path = require('path');

/**
 * Event model
 * @const
 */
const Event = require(path.join(__dirname, '..', 'models', 'event.js'));

/**
 * Category model
 * @const
 */
const Category = require(path.join(__dirname, '..', 'models', 'category.js'));


/**
 * Stats controller
 * @const
 */
const statsCont = require(path.join(__dirname, 'stat-controller.js'));


module.exports = {
     /**
     * Function to get all categories
     * @function
     * @async
     * @name getAllCategories
     * @name getAllCategories
     * @returns {Array} array of all categories
     */
    getAllCategories: async function () {
        return await Category.find({}).populate('eventsList');
    },

    /**
     * A function to get categories based on a condition
     * @function
     * @name getCategories
     * @async
     * @param {Object} condition 
     * @returns {Array} array of events satisfying the condition
     */

    getCategories: async function (condition) {
        return await Category.find(condition);
    },

     /**
     * A function to get one category based on a condition
     * @function
     * @name getOneCategory
     * @async
     * @param {Object} conditon 
     * @returns {Object} category satisfying the condition
     */
    getOneCategory: async function (conditon) {
        return await Category.findOne(conditon);
    },

    /**
     * A function to add an category
     * @function
     * @name addCategory
     * @async
     * @param {Object} data 
     * @returns {String} id of the newly created category
     */
    addCategory: async function (data) {
        let aCategory = new Category(data);
        await aCategory.save();
        await statsCont.addCreated();
        return aCategory.id;
    },

     /**
     * A function to delete an category
     * @function
     * @name deleteCategory
     * @async
     * @param {String} categoryId 
     * @returns {Object} result of the delete operation
     */

    deleteCategory: async function (categoryId) {
        let theCategory = await Category.findOne( { id: categoryId } );

        if (theCategory) {
            let events = theCategory.eventsList;
            let event;
            for (let eventId of events) {
                event = await Event.findOne( { _id: eventId } );
                if (!event) {
                    continue;
                }

                let eventIndex = event.categoriesList.indexOf(theCategory._id);
                event.categoryList.splice(eventIndex, 1);
                await event.save();
            }
            await statsCont.addDeleted();
        }

        result = await Category.deleteOne( { id: categoryId } );

        return result;
    },


     /**
     * A function to update an category
     * @function
     * @name updateCategory
     * @async
     * @param {String} categoryId 
     * @param {String} newName 
     * @param {Number} newDescription 
     * @returns {Object} result of the update operation
     */

    updateCategory: async function (categoryId, newName, newDescription, newImage) {
        statusObject = {status: "ID not found"};

        result = await Category.updateOne({ id: categoryId}, { $set: {name: newName, description: newDescription, image: newImage} });

        if (result.matchedCount > 0) {
            statusObject.status = "ID found";
            statsCont.addUpdated();
        }

        return statusObject;
    },

    /**
     * A function to get the count of category
     * @function
     * @name getCount
     * @async
     * @returns {Number} count of categories
     */
    getCount: async function(){
        return await Category.count();
    }

}

