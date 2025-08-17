import cloudinary from "cloudinary";
const { v2: cloudinaryV2 } = cloudinary;
import multer from "multer";
import path from "path";

cloudinaryV2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Use memory storage instead of CloudinaryStorage
const storage = multer.memoryStorage();

// Function to upload to Cloudinary manually
const uploadToCloudinary = async (fileBuffer: any, originalname: any) => {
    try {
        const Id = '65191dfecc8ccbf65f263a29';
        if (!Id || typeof Id !== 'string') {
            throw new Error('User ID is missing or invalid');
        }

        let autoTaggingOptions = {};
        if (path.extname(originalname).match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
            autoTaggingOptions = {
                categorization: "aws_rek_tagging",
                auto_tagging: 0.8
            };
        }

        const uploadOptions = {
            folder: "Countries/temp/" + Id,
            resource_type: "auto" as "auto",
            transformation: [{
                height: 1000,
                width: 1500,
                crop: 'fit'
            }],
            public_id: Date.now().toString() + "-" + path.basename(originalname, path.extname(originalname)),
            // ...autoTaggingOptions
        };

        return new Promise((resolve, reject) => {
            cloudinaryV2.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(fileBuffer);
        });
    } catch (error) {
        console.error('Error in Cloudinary upload:', error);
        throw error;
    }
};

export { storage, cloudinaryV2, uploadToCloudinary };