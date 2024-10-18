const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://dung2001:gW8LFefR6btLdxwJ@cluster0.qsmoy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        // const conn = await mongoose.connect('mongodb://localhost:27017/volunteer_blog', {
        // });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
