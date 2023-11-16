const publicUser = (user) => ({
    id: user.id,
    name: user.name,
    role: user.role,
    avatar: user.avatar
});

module.exports = { publicUser };