/**
 * @fileOverview  event-controller.js
 * @description Controller for Event
 * @author Abhijit Upadhyay
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
     * Function to get all events
     * @function
     * @async
     * @name getAllEvents
     * @name getAllEvents
     * @returns {Array} array of all events
     */
    getAllEvents: async function () {
        let events = await Event.find({});
        for (let event of events) {
            await event.populate('categoryList');
        }
        return events;
    },

    /**
     * A function to get events based on a condition
     * @function
     * @name getEvents
     * @async
     * @param {Object} condition 
     * @returns {Array} array of events satisfying the condition
     */
    getEvents: async function (condition) {
        let events = await Event.find(condition);
        for (let event of events) {
            await event.populate('categoryList');
        }
        return events;
    },

    /**
     * A function to get one event based on a condition
     * @function
     * @name getOneEvent
     * @async
     * @param {Object} conditon 
     * @returns {Object} event satisfying the condition
     */
    getOneEvent: async function (conditon) {
        return await Event.findOne(conditon).populate('categoryList');
    },

    /**
     * A function to add an event
     * @function
     * @name addEvent
     * @async
     * @param {Object} data 
     * @returns {String} id of the newly created event
     */
    addEvent: async function (data) {
        let aEvent = new Event(data);
        await aEvent.save();
        await statsCont.addCreated();
        return aEvent.id;
    },

    /**
     * A function to delete an event
     * @function
     * @name deleteEvent
     * @async
     * @param {String} eventId 
     * @returns {Object} result of the delete operation
     */
    deleteEvent: async function (eventId) {
        let theEvent = await Event.findOne( { id: eventId } );

        if (theEvent) {
            let categories = theEvent.categoryList;
            let category;
            for (let categoryId of categories) {
                category = await Category.findOne( { _id: categoryId } );
                if (!category) {
                    continue;
                }

                let eventIndex = category.eventsList.indexOf(theEvent._id);
                category.eventsList.splice(eventIndex, 1);
                await category.save();
            }
            await statsCont.addDeleted();
        }

        result = await Event.deleteOne( { id: eventId } );

        return result;
    },

    /**
     * A function to update an event
     * @function
     * @name updateEvent
     * @async
     * @param {String} eventId 
     * @param {String} newName 
     * @param {Number} newCapacity 
     * @returns {Object} result of the update operation
     */
    updateEvent: async function (eventId, newName, newCapacity) {
        statusObject = {status: "update failed"};

        if (!newName || newCapacity < 10 || newCapacity > 2000) {
            return statusObject;
        }

        result = await Event.updateOne({ id: eventId}, { $set: {name: newName, capacity: newCapacity} });

        if (result.matchedCount > 0) {
            statusObject.status = "updated successfully";
            await statsCont.addUpdated();
        }

        return statusObject;
    },

    /**
     * A function to get the count of events
     * @function
     * @name getCount
     * @async
     * @returns {Number} count of events
     */
    getCount: async function () {
        return await Event.count();
    }
}
