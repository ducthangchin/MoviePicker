const { User } = require('../models/db');
const fs = require('fs');
const { root } = require('../config/image.config');

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        return user;
    }
    catch (error) {
        console.error('Error retrieving user by email:', error);

        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);

        return user;
    } catch (error) {
        console.error('Error retrieving user by ID:', error);

        throw error;
    }
};

const createUser = async (user) => {
    try {
        const createdUser = await User.create({
            name: user.name,
            email: user.email,
            passwork: user.passwork
        });

        return createdUser;
    }
    catch (error) {
        console.error('Error creating user:', error);

        throw error;
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'avatar']
        });

        return users;
    }
    catch (error) {
        console.error('Error retrieving all users:', error);

        throw error;
    }
};

const setName = async (id, name) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.name = name;
            await user.save();
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error updating user name:', error);
        throw error;
    }
};

const setPassword = async (id, password) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.password = password;
            await user.save();
            return user;
        } else {
            return null;
        }
    }
    catch (error) {
        console.error('Error updating user password', error);

        throw error;
    }
};

const updateRefreshToken = async (id, refreshToken) => {
    try {
        const user = await User.findByPk(id);
        if (user) {
            user.refreshToken = refreshToken;
            await user.save();
        } else {
            return null;
        }
    }
    catch (error) {
        console.error('Error updating user refresh token', error);

        throw error;
    }
};

const deleteById = async (id) => {
    try {
        const user = await User.findByPk(id);

        if (user) {
            const userInfo = { ...user };
            await user.destroy();
            return userInfo;
        }
        else return null;
    }
    catch (error) {
        console.error('Error deleting user', error);

        throw error;
    }
};

const updateAvatar = async (id, avatar) => {
    try {
        const user = await user.findByPk(id);

        if (user) {
            const oldAvatar = user.avatar;
            if (oldAvatar && oldAvatar !== 'default.png') {
                fs.unlink(root + '/' + oldAvatar, (err) => {
                    if (err) {
                        console.error('Error deleting old avatar file:', err);
                    } else {
                        console.log('Successfully deleted old avatar file');
                    }
                });
            }

            await user.update({ avatar: avatar });
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error updating user avatar:', error);

        throw error;
    }
};

module.exports = {
    getUserByEmail,
    getAllUsers,
    getUserById,
    createUser,
    setName,
    setPassword,
    deleteById,
    updateRefreshToken,
    updateAvatar
};
