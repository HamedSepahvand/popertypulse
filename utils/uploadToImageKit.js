import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadToImageKit = async (file, fileName) => {
  try {
    const result = await imagekit.upload({
      file,
      fileName,
      folder: "/properties",
    });

    return {
      url: result.url,
      fileId: result.fileId,
      fileName: result.name,
    };
  } catch (error) {
    console.error("IMAGEKIT UPLOAD ERROR:", error);
    throw new Error("Image upload failed");
  }
};
