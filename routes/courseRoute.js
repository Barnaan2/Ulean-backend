const express = require('express');
const { getCourses, getCourse, createCourse , updateCourse, deleteCourse , getStats} = require('./../controllers/courseController');
const router = express.Router();
const {topRatedCourses} = require('./../middlewares/topRatedCourses')



router.route('/')
.get(getCourses)
.post(createCourse);

router.route('/Top-rated-courses/')
.get(topRatedCourses,getCourses);

router.route('/course-sats/').
get(getStats);

router.route('/:id')
.get(getCourse)
.patch(updateCourse)
.delete(deleteCourse);


module.exports = router;