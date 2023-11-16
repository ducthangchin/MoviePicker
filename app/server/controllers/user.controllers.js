const bcrypt = require('bcrypt');

const userService = require('../services/user.services');

const { SALT_ROUNDS } = require('../config/auth.config');
const send500Error = require('../exceptions/500');
const { publicUser } = require('../utils/userDto');

exports.getUserInfo = async (req, res) => {
    const userId = req.query.id;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.json({
                message: 'user not found',
                result: null
            });
        } else {
            const userPublicInfo = publicUser(user);

            return res.json(userPublicInfo);
        }
    } catch (error) {
        send500Error(res, error);
    }
};

exports.deleteUser = async (req, res) => {
    const user = req.user;
    if (user.role !== 'admin')
        return res.send('You have no access to this feature.');
    const id = req.query.id;

    try {
        const result = await userService.getUserById(id);

        if (!result) {
            return res.json({
                message: 'user not found',
                result: false,
            });
        } else {
            await userService.deleteById(id);
            return res.json({
                message: `User with id ${id} has been deleted`,
                result: true,
            });
        }
    }
    catch (error) {
        send500Error(res, error);
    }
};

exports.getAllUsers = async (req, res) => {
    const user = req.user;
    if (user.role !== 'admin')
        return res.send('You have no right to access this feature.');
    try {
        const result = await userService.getAllUsers();

        return res.send(result);
    } catch (error) {
        send500Error(res, error);
    }
};

exports.changePassword = async (req, res) => {
    const user = req.user;
    const newPassword = req.body.new_password;

    if (!newPassword) return res.status(401).send('new_password not found');

    const hashPassword = bcrypt.hashSync(newPassword, SALT_ROUNDS);

    try {
        const updatedUser = await userService.setPassword(user.id, hashPassword);
        const userPublicInfo = publicUser(updatedUser);

        return res.json(userPublicInfo);
    } catch (error) {
        send500Error(res, error);
    }
};

exports.changeName = async (req, res) => {
    const user = req.user;
    const newName = req.body.new_name;

    if (!newName) return res.status(401).send('new_name not found');

    try {
        const updatedUser = await userService.setName(user.id, newName);
        const publicUser = publicUser(updatedUser);

        res.json({
            message: 'Name changed successfully',
            user: publicUser
        });
    } catch (error) {
        send500Error(res, error);
    }
};

exports.uploadAvatar = async (req, res) => {
    const user = req.user;

    try {
        const updatedUser = await userService.updateAvatar(user.id, req.file.filename);
        const publicUser = publicUser(updatedUser);

        return res.json(publicUser);
    } catch (error) {
        send500Error(res, error);
    }
};
