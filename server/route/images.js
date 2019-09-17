const images = require("../models/images");

function errorHandler(err, res) {
    res.status(500).send(err);
    throw (err);
}

function findAndDelete(deletedImages) {
    images.findByIdAndDelete({ _id: deletedImages }).then((data) => {
        console.log(data);
    });
}

function createImgObject(files, req) {
    const imgArray = [];
    let img;
    files.forEach((item) => {
        img = {
            path: item.filename,
            user_id: req.body.user_id
        };
        imgArray.push(img);
    });
    return imgArray;
}

const imagesData = {

    getImages(id) {
        return images.find({ user_id: id });
    },

    setImages(req, res) {
        const files = req.files;
        let imgArray = [];
        const deletedImages = req.body.deletedImages;
        if (deletedImages && deletedImages.length) {
            if (typeof deletedImages === "string") {
                findAndDelete(deletedImages);
            }
            else {
                for (let i = 0; i < deletedImages.length; i++) {
                    findAndDelete(deletedImages[i]);
                }
            }
        }
        imgArray = createImgObject(files, req);
        images.create(imgArray)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => errorHandler(err, res));
    },

    getAllImages(req, res) {
        images
            .find({}).sort({ date: 1 })
            .populate('user_id')
            .then((images) => {
                res.send(images);
            });
    }
};

module.exports = imagesData;