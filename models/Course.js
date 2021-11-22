const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const CourseSchema = new Schema({
  name: {
    type: "string",
    unique: true,
    required: true,
  },
  description: {
    type: "string",
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: "string",
    unique: true,
  }, 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  }
});

CourseSchema.pre('validate', function(next){
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  })
  next()
})

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;