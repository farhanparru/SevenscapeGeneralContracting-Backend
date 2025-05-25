const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
      countryCode: {
        type: String,
        required: [true, 'Country code is required'],
        trim: true,
        match: [/^\+?\d{1,4}$/, 'Please provide a valid country code']
      },
      number: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\d{6,15}$/, 'Please provide a valid phone number']
      }
    },
    serviceNeeded: {
      type: String,
      required: [true, 'Service needed is required'],
      enum: {
        values: ['facility management', 'general contracting', 'maintenance services', 'others'],
        message: '{VALUE} is not a valid service type'
      }
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    // Optional: You might want to track when the customer was created
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    // Enable virtuals if you need to compute derived properties
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for full phone number
CustomerSchema.virtual('fullPhoneNumber').get(function() {
  return `${this.phone.countryCode}${this.phone.number}`;
});

// You can add indexes for better query performance
CustomerSchema.index({ email: 1 }); // Index on email for faster lookups
CustomerSchema.index({ serviceNeeded: 1 }); // Index on service type

module.exports = mongoose.model('Customer', CustomerSchema);