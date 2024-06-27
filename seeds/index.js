const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Tutor = require('../models/tutor');
require('dotenv').config(); // Load environment variables from .env file

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    } catch (err) {
        console.error('Connection error', err);
    }
};

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Tutor.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const newTutor = new Tutor({
            title: 'Bishal Kundu',
            subjects: ['Computer Science', 'Maths', 'Physics'],
            price: 1000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            address: '13H Barodasarani, Kol-82',
            city: 'Kolkata',
            country: 'India',
            author: '6460b601f9ffeaad05f47bb0'
        });
        await newTutor.save();
    }
};

main()
    .then(() => {
        seedDB().then(() => {
            mongoose.connection.close();
        });
    })
    .catch(err => {
        console.error('Database initialization failed', err);
    });
