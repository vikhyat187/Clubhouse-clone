const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const refreshModel = require('../models/refresh-model');

class AuthController {
    async sendOtp(req, res) {

        const {
            phone
        } = req.body;
        if (!phone) {
            res.status(400).json({
                message: 'Phone field is required!'
            });
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 2; // 2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        // send OTP
        try {
            // await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'message sending failed'
            });
        }
    }

    async verifyOtp(req, res) {

        const {
            otp,
            hash,
            phone
        } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({
                message: 'All fields are required!'
            });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({
                message: 'OTP expired!'
            });
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({
                message: 'Invalid OTP'
            });
        }

        let user;
        try {
            user = await userService.findUser({
                phone
            });
            if (!user) {
                user = await userService.createUser({
                    phone
                });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Db error'
            });
        }

        const {
            accessToken,
            refreshToken
        } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        const userDto = new UserDto(user);
        res.json({
            user: userDto,
            auth: true
        });
    }

    async refresh(req, res) {
        //get refresh token
        const {
            refreshToken: refreshTokenFromCookie
        } = req.cookies;
        //check if its valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        } catch (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        // check if the token is in db
        try {
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie)

            if (!token) {
                res.status(401).json({
                    message: "Invalid token "
                })
            }
        } catch (err) {
            res.status(500).json({
                message: 'Db error.'
            })
        }
        //check if valid user
        const user = await userService.findUser({
            _id: userData._id
        })

        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }
        // create a new token
        const {
            accessToken,
            refreshToken
        } = await tokenService.generateTokens({
            _id: userData._id
        })
        //update in db
        try {
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch (err) {
            res.status(500).json({
                message: "Db error"
            })
        }
        // store in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        // send in response
        const userDto = new UserDto(user);
        res.json({
            user: userDto,
            auth: true
        });
    }
    async logout(req,res){
        const {refreshToken} = req.cookies;
        //delete refresh token 
        await tokenService.removeToken(refreshToken);
        //delete refresh token
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken')
        res.json({user: null, auth:false});
    }
}

module.exports = new AuthController();