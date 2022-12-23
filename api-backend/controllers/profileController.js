const { User } = require("../utilities/database");

exports.profileLayout = async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({where: {username}});
    return res.status(200).json({user: user.toJSON()});
}

exports.updateProfile = async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({where: {username}});

    const newUsername = req.body.username;
    if(newUsername) User.username = newUsername;

    const password = req.body.password;
    if(password) User.password = password;

    const name = req.body.name;
    if(name) User.name = name;

    const surname = req.body.surname;
    if(surname) User.surname = surname;

    const ageGroup = req.body.ageGroup;
    if(ageGroup) User.ageGroup = ageGroup;

    const sex = req.body.sex;
    if(sex) User.sex = sex;

    const city = req.body.city;
    if(city) User.city = city;

    const state = req.body.state;
    if(state) User.state = state;

    const income = req.body.income;
    if(income) User.income = income;

    await user.save();

    return res.status(200).json({message: 'personal info updated successfully'});
}