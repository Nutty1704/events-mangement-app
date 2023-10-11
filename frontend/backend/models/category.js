//set the template for the two random Characters (String)
const randString = require("randomstring");
const mongoose = require("mongoose");

// class Category {
//     /**
//      * Represents a Category
//      * @constructor
//      * @param {Alphanumeric} name - Name of the category
//      * @param {string} description - Description of the category
//      * @param {string} image - path to image (static resource)
//      */
//     constructor(name, description, image) {
//         this.id = this.#generateId();
//         this.name = name;
//         this.description = description !== '' ? description : 'Default Description';
//         this.image = image !== '' ? image : '/book.jpg';
//         this.date = new Date();
//     }

//     /**
//      * Generates a unique ID for the event of format CXX-1234
//      * @function
//      * @private
//      * @returns {string} - A unique ID for the event
//      */
//     #generateId() {
//         let id = 'C';

//         // randString = random string method
//         id += randString.generate({
//             length: 2,
//             charset: this.name,
//         }).toUpperCase();
//         id += '-';

//         // randomly pick the dig number from (0,10000]
//         id += Math.round(Math.random() * 10000);
//         return id;
//     }
// }

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Only Accept Alphanumeric Values!',
        },
    },

	description: {
		type: String,
		default: "Desc"
	},

    image:{
        type: String,
        default: "/book.jpg"
    },

    date:{
        type: Date,
        default: Date.now
    },

    eventsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    ],

    id:{
        type: String,
        default: function () {
            let id = 'C';

            // randString = random string method
            id += randString.generate({
                length: 2,
                charset: this.name,
            }).toUpperCase();
            id += '-';
    
            // randomly pick the dig number from (0,10000]
            id += Math.round(Math.random() * 10000);
            return id;
        }
    }
});

// categorySchema.statics.getCategoryWithEventName = async function (categoryId) {
//     const category = await this.findById(categoryId).populate('eventList').exec();
//     return category;
//};


// Export both the Category class and the categorySchema
module.exports = mongoose.model('Category', categorySchema);
