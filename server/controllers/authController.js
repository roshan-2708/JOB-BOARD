const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const verifyToken = crypto.randomBytes(32).toString('hex');
        const verifyTokenExpires = Date.now() + 15 * 60 * 1000; // 15 mins

        const user = await User.create({
            name,
            email,
            password,
            role,
            isVerified: false,
            verifyToken,
            verifyTokenExpires,
        });

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const verificationUrl = `${frontendUrl}/verify-email?token=${verifyToken}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verify Your Email Address - Job Board',
                message: `Hello ${name},\n\nPlease click the link below to verify your email address:\n${verificationUrl}\n\nThis link is valid for 15 minutes.`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                        <h2 style="color: #2563eb;">Welcome to Job Board, ${name}!</h2>
                        <p>Thank you for registering. Please click the button below to verify your email address:</p>
                        <div style="text-align: center; margin: 25px 0;">
                            <a href="${verificationUrl}" style="padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verify Email Address</a>
                        </div>
                        <p style="color: #666; font-size: 13px;">This link is valid for 15 minutes.</p>
                        <p style="color: #888; font-size: 12px; word-break: break-all;">Or copy and paste this link into your browser: <br/><a href="${verificationUrl}">${verificationUrl}</a></p>
                    </div>
                `
            });
        } catch (emailErr) {
            console.error("Verification email could not be sent:", emailErr);
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully! Please check your email to verify your account before logging in."
        });

    } catch (error) {
        console.log("Internal Error in register controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const token = req.params.token || req.query.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Verification token is missing",
            });
        }

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token",
            });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
        });
        
    } catch (error) {
        console.error("Error in verify email : ", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: "Please verify your email address before logging in. Check your inbox for the verification link.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.log("Internal Error in login controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        })
    } catch (error) {
        console.error("Error in get user profile controller", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server issue",
        })
    }
}