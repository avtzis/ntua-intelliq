const { User, Administrator } = require("../utilities/database");

exports.profileLayout = async (req, res) => {
    const username = req.user.username;
    let user = await User.findOne({where: {username}});
    if(!user) user = await Administrator.findOne({where: {username}});
    return res.status(200).json({user});
}

exports.updateProfile = async (req, res) => {
    const username = req.user.username;
    let user = await User.findOne({where: {username}});
    if(!user) user = await Administrator.findOne({where: {username}});

    const password = req.body.password;
    if(password) user.password = password;

    const name = req.body.name;
    if(name) user.name = name;

    const surname = req.body.surname;
    if(surname) user.surname = surname;

    const ageGroup = req.body.ageGroup;
    if(ageGroup) user.ageGroup = ageGroup;

    const sex = req.body.sex;
    if(sex) user.sex = sex;

    const city = req.body.city;
    if(city) user.city = city;

    const state = req.body.state;
    if(state) user.state = state;

    const education = req.body.education;
    if(education) user.education = education;

    const income = req.body.income;
    if(income) user.income = income;

    await user.save();

    return res.status(200).json({message: 'personal info updated successfully'});
}