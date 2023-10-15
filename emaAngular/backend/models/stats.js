/**
 * @fileOverview  Stats model.
 */

/**
 * mongoose module
 * @const
 */
const mongoose = require('mongoose');

/**
 * Stats schema
 * @const
 */
const statSchema = new mongoose.Schema({
    id: {
        type: String,
        default: "stats"
    },

    recordsCreated: {
        type: Number,
        default: 0
    },

    recordsDeleted: {
        type: Number,
        default: 0
    },

    recordsUpdated: {
        type: Number,
        default: 0
    }
});

/**
 * Exports the Stats model
 */
module.exports = mongoose.model('Stats', statSchema);