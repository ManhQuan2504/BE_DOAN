const uploadFunction = async (req, res) => {
  try {
    const image = req.files.image[0];
    console.log("🚀 ~ uploadFunction ~ req.file:", req.files)

    if (!image) {
      return res.status(400).send("No file uploaded.");
    }

    const relativeUrl = `images/${image.filename}`;
    const absoluteUrl = `${process.env.API_BASE_URL}/media/${relativeUrl}`;

    const data = {
      absoluteUrl,
      relativeUrl,
      original_name: image.originalname,
      generate_name: image.filename,
    };
    console.log("🚀 ~ uploadFunction ~ data:", data)

    res.json(data);
  } catch (error) {
    return res.status(400).json({
      status: "ERR",
      error: error.message
    });
  }
};

export default {
  uploadFunction
}