const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Use the hardcoded fallback here too
        const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/academia_synapse';
        // const uri = 'mongodb+srv://synapse_admin:P@ssword123@cluster0.mongodb.net/academia_synapse';
        await mongoose.connect(uri);
        console.log('MongoDB Connected via config/db.js');
    } catch (err) {
        console.error('Database connection failed in config/db.js:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
