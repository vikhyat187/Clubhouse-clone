class userDto{
    id;
    phone;
    activated;
    name;
    avatar;
    createdAt;

constructor(user){
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}`: null;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
}
}

module.exports = userDto;