const mongoose = require('mongoose');
const { UserBindingContext } = require('twilio/lib/rest/chat/v2/service/user/userBinding');
const Schema = mongoose.Schema;



const refreshSchema = new Schema({
    token : {type:String, required:true},
    userId : {type: Schema.Types.ObjectId, ref : 'User'}
},{
    timestamps:true
})

module.exports = mongoose.model('Refresh',refreshSchema,'tokens');