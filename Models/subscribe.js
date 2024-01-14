const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Use createIndexes instead of ensureIndex
subscribeSchema.index({ email: 1 }, { unique: true });

const Subscriber = mongoose.model('Subscriber', subscribeSchema);

module.exports = Subscriber;
