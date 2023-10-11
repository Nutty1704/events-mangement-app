/**
 * path module
 * @const
 */
const path = require('path');

/**
 * Stats controller
 * @const
 */
const Stats = require(path.join(__dirname, '..', 'models', 'stats.js'));


module.exports = {
    /**
     * function to get the stats
     * @function
     * @name getStats
     * @returns {object} stats
     */
    getStats: async function () {
        let stats = await Stats.findOne({ id: "stats" });
        return stats;
    },

    /**
     * Creates a stats object if it does not exist
     * @function
     * @name instantiate
     * @returns {boolean} result
     */
    instantiate: async function () {
        let stats = await Stats.findOne({ id: "stats" });
        let result = false;

        if (!stats) {
            stats = new Stats();
            await stats.save();
            result = true;
        }

        return result;
    },

    /**
     * Increases the count of records created
     * @function
     * @name addRecord
     * @returns {void}
     */
    addCreated: async function () {
        let stats = await Stats.findOne({ id: "stats" });
        stats.recordsCreated++;
        await stats.save();
    },

    /**
     * Increases the count of records deleted
     * @function
     * @name addDeleted
     * @returns {void}
     */
    addDeleted: async function () {
        let stats = await Stats.findOne({ id: "stats" });
        stats.recordsDeleted++;
        await stats.save();
    },

    /**
     * Increases the count of records updated
     * @function
     * @name addUpdated
     * @returns {void}
     */
    addUpdated: async function () {
        let stats = await Stats.findOne({ id: "stats" });
        stats.recordsUpdated++;
        await stats.save();
    }
}