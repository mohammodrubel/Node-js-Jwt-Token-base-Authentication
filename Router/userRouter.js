const express = require('express')
const User = require('../Schema/userSchema')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



router.post('/signup', async (req, res) => {
    console.log(req.body)
    try {
        const existingUser = await User.findOne({ userName: req.body.userName });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists. Please log in with your existing account.' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            userName: req.body.userName,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'New user created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });

        if (user) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if (isValidPassword) {
                // Generate Token
                const token = jwt.sign({
                    userName: user.userName,
                    userId: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });

                return res.status(200).json({
                    access_Token: token,
                    message: 'Login Successful',
                    user:user
                });
            }
        }

        res.status(401).json({
            error: 'Authentication Failed! ensure your password or userName'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});




module.exports = router