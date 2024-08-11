// utilities/joiExtension.js
const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// Extends Joi
const Joi = baseJoi.extend((joi) => ({
     // Define a new type of validation based on 'string' type
    type: 'string',
    base: joi.string(),

    // Define custom error messages 
    messages: {
        'string.escapeHTML': '{{#label}} contains unsafe HTML content',
    },

    rules: {
        escapeHTML: {
            
            // This function is the core logic that gets executed when the escapeHTML rule is applied during validation.
            // value: current value being validated
            validate(value, helpers) {  

                // Sanitize the HTML content using sanitize-html package
                const clean = sanitizeHtml(value, {
                    allowedTags: [],   // No HTML tags are allowed
                    allowedAttributes: {},   // No attributes are allowed
                });
                if (clean !== value)
                     // Trigger a validation error using the custom message defined above
                    return helpers.error('string.escapeHTML', { value });
                    
                return clean;
            },
        },
    },
}));

module.exports = Joi; // Export the extended Joi
