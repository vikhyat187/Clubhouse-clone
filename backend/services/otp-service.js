const crypto = require('crypto');
const hashService = require('./hash-service');
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
});


class OtpService{
    async generateOtp(){
        const otp  = crypto.randomInt(1000,9999);
        return otp;
    }

    async sendBySMS(phone, otp){
       return await twilio.messages.create({
            body:`Yours coder's house otp is ${otp}`,
            from:process.env.SMS_FROM,
            to:phone
        });
        
    }

    verifyOtp(hashedOtp, data){
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp?true:false;
    }


}

module.exports = new OtpService();