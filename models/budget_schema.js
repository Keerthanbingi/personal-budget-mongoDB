const mongoose = require('mongoose');

// Define the budget schema
const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^#[0-9A-Fa-f]{6}$/.test(v);  // Hexadecimal color validation
            },
            message: props => `${props.value} is not a valid hexadecimal color!`
        }
    }
});

// Create and export the model based on the schema
module.exports = mongoose.model('Budget', budgetSchema);