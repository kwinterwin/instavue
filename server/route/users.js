const users = require("../models/users");

function formatDate(ISOStringDate) {
    const date = new Date(Date.parse(ISOStringDate));
    let formatDate = "";
    formatDate = `${date.getFullYear()}-${date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    return formatDate;
}

function userJSONObject(user) {
    return {
        id: user._id,
        real_name: user.real_name,
        date_of_birth: formatDate(user.date_of_birth),
        email: user.email,
        avatarFile: user.avatarFile,
        photos: user.photos
    };
}

function errorHandler(err, res) {
    res.status(500).send(err);
    throw (err);
}

function createUser(user, res) {
    users.create(user)
        .then((data) => {
            if (data) {
                res.status(200).send({ type: "success", text: "Successfull registration!" });
            }
        })
        .catch((err) => errorHandler(err, res));
}

function sendResult(status, data, res) {
    res.status(status).json(data);
}

const usersData = {
    addUser(req, res) {
        const user = req.body;
        users
            .find({ email: user.email })
            .then((userData) => {
                if (!userData.length) {
                    createUser(user, res);
                } else {
                    sendResult(400, { type: "error", text: "User with this email is already registered!" }, res);
                }
            })
            .catch((err) => errorHandler(err, res));
    },

    getUsers(req, res) {
        users
            .find({})
            .then((users) => {
                users = users.map((user) => {
                    return userJSONObject(user);
                });
                sendResult(200, users, res);
            })
            .catch((err) => errorHandler(err, res));
    },

    getUser(req, res) {
        const userId = req.params.id;
        users
            .findOne({ _id: userId })
            .populate("photos")
            .then((user) => {
                user = userJSONObject(user);
                sendResult(200, user, res);
            })
            .catch(() => sendResult(500, {}, res));
    },

    checkedLoginInformation(req, res) {
        const userInfo = req.query;
        users.findOne(userInfo).then((user) => {
            user = userJSONObject(user);
            sendResult(200, user, res);
        });
    },

    updateUser(req, res) {
        let user = req.body;
        users
            .updateOne({ _id: user.id }, user)
            .populate("photos")
            .then((data) => {
                if (data.ok) {
                    user = userJSONObject(user);
                    sendResult(200, user, res);
                }
            })
            .catch((err) => errorHandler(err, res))
    }
};

module.exports = usersData;