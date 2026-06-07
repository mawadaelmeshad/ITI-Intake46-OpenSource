require('dotenv').config();
const connectDB = require('../db/connect');
const User = require('../models/userModel');
(async () => {
try {
    await connectDB();
    const email = 'sample@example.com';
    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
    console.log('User already exists with id:', user._id.toString());
    process.exit(0);
    }

    user = await User.create({ name: 'Sample User', email, password: 'pass1234' });
    console.log('Created user with id:', user._id.toString());
    process.exit(0);
} catch (err) {
    console.error(err);
    process.exit(1);
}
})();
