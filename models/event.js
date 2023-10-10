/**
 * @fileoverview Event Model
 * @author Abhijit Upadhyay
 */

/**
 * mongoose module
 * @const
 */
const mongoose = require('mongoose');

/**
 * randomstring module
 * @const
 */
const randString = require('randomstring');

/**
 * Event Schema
 * @const
 */
const eventSchema = new mongoose.Schema({

    id: {
        type: String,
        default: function () {
            let id = 'E';
            id += randString.generate({
                length: 2,
                charset: this.name
            }).toUpperCase();
            id += '-';
            id += Math.round(Math.random() * 10000);
            return id;
        },
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: 'Default Description'
    },

    startDateTime: {
        type: Date,
        required: true
    },

    duration: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: 'Duration must be greater than 0'
        }
    },

    isActive: {
        type: Boolean,
        default: true
    },

    image: {
        type: String,
        default: '/event-default.jpg'
    },

    capacity: {
        type: Number,
        validate: {
            validator: (value) => (10 <= value && value <= 2000),
            message: 'Capacity must be between 10 and 2000'
        },
        default: 1000
    },

    ticketsAvailable: {
        type: Number,
        default: function () {
            return this.capacity;
        }
    },

    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});


/**
* Gives the duration of the event in hours and minutes
* @function
* @returns {string} - A string representation of the event's duration
*/
eventSchema.methods.getDurationString = function () {
    let hours = Math.floor(this.duration / 60);
    let minutes = this.duration % 60;

    if (hours > 0){return `${hours} hours ${minutes} minutes`;}
    else {return `${minutes} minutes`;}
}

/**
* Calculates the end date and time of the event and returns a Date object
* @function
* @private
* @returns {Date} - End date and time of the event
*/
eventSchema.methods.getEndDateTime = function () {
    // duration is in minutes, convert to milliseconds
    let durationMilliseconds = this.duration * 60 * 1000;
    // get absolute end time in milliseconds
    let endDateTime = this.startDateTime.getTime() + durationMilliseconds;
    // create a Date object using this absolute time
    return new Date(endDateTime);
}


/**
 * Exports Event model
 */
module.exports = mongoose.model('Event', eventSchema);