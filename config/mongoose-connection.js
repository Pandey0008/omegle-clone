const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log('Database connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = db;