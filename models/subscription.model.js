import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        maxLenght: 32,
        minLength: 5
    },
    price : {
        type: Number,
        required: [true, 'Subscription price is required'],
        trim: true,
        min: [0, 'Price must be greater than 0']
    },
    currency : {
        type: String,
        required: [true, 'Subscription currency is required'],
        trim: true,
        enum: ['USD', 'EUR', 'BDT'],
        default: 'BDT',
    },
    frequency : {
        type: String,
        required: [true, 'Subscription frequency is required'],
        trim: true,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
    },
    catagory: {
        type: String,
        required: [true, 'Subscription catagory is required'],
        trim: true,
        enum: ['sports', 'news', 'entertainment', 'education', 'technology', 'health', 'others'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Subscription payment method is required'],
        trim: true,
        enum: ['bkash', 'cash', 'nagad', 'rocket', 'visa', 'mastercard', 'paypal', 'others'],
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: function(date) {
                return date <= Date.now();
            },
            message: 'Start date must be a future date'
        }
    },
    renewDate:{
        type: Date,
        validate: {
            validator: function(date) {
                return date > this.startDate;
            },
            message: 'Renew date must be after start date'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        // index for optimse the query by indexing the user fields
        index: true,
    },
    userEmail :  {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'],
    },
}, {timestamps: true});

// auto calculate renew date 
subscriptionSchema.pre('save', function(next){
    if(!this.renewDate){
        const frequencyPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }

        // add the frequency period to start date to get renew date
        this.renewDate = new Date(this.startDate);
        this.renewDate.setDate(this.renewDate.getDate() + frequencyPeriod[this.frequency]);
    }

    // check renew date status
    if(this.renewDate < Date.now()){
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;