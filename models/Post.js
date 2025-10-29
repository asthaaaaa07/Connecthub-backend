const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 1000
  },
  image: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});


postSchema.pre('find', function() {
  this.populate('user', 'name email');
});

postSchema.pre('findOne', function() {
  this.populate('user', 'name email');
});

module.exports = mongoose.model('Post', postSchema);

