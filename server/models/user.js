
const mongoose = require("mongoose")

const userWallet = new mongoose.Schema({
    balance: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    transactions: [{
        type: {
            type: String,
            enum: ['credit', 'debit', 'cash'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: String
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
    
})

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required:true
    },
    password : {
        type : String,
        required : true
    },
    userType : {
        type: String,
        // required: true
    },
    profile: {
        age: Number,
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        },
        address: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        }
    },
    wallet : userWallet
})


const User = mongoose.model('User', userSchema)


module.exports = User