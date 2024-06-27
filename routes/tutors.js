const express = require('express');
const router = express.Router();
const { isLoggedIn, validateTutor, isAuthor } = require('../middleware');
const tutors = require('../controllers/tutors');

// Remove multer and cloudinary imports as they are not necessary
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

router.route('/')
    .get(tutors.index)
    .post(isLoggedIn, tutors.createTutorPost);  // Add validateTutor if you need validation for tutor creation

router.get('/new', isLoggedIn, tutors.renderNewForm);

router.route('/:id')
    .get(isLoggedIn, tutors.showTutorPost)
    .put(isLoggedIn, isAuthor, tutors.updateTutorPost)  // Add validateTutor if you need validation for tutor updates
    .delete(isLoggedIn, isAuthor, tutors.deleteTutorPost);

router.get('/:id/edit', isLoggedIn, isAuthor, tutors.renderEditForm);

module.exports = router;
