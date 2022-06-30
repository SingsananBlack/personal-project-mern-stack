const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: 'auto',
    });
    res.send(result);
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};

exports.deleteImage = async (req, res) => {
  try {
    let image_id = req.body.public_id;
    await cloudinary.v2.uploader.destroy(image_id, (result) => {
      res.send(result)
    });
  } catch (err) {
    res.status(500).send('Internal server error!');
  }
};
