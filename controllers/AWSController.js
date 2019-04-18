import {S3, config} from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

config.update({
    region: 'us-west-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    signatureVersion: 'v4'
});

const AWS_S3_IMAGE_BUCKET_NAME = 'capstone406';

export const s3 = new S3();

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_S3_IMAGE_BUCKET_NAME,
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldname: file.fieldname})
        },
        key: function(req, file, cb) {
            const fileName = `${req.baseUrl.replace('/', '')}/${req.query.id}.jpg`;
            cb(null, fileName);
        }
    })
});

export function getImage(res, folder, file) {
    const fileName = `${folder}/${file}`;
    return s3.getObject({
        Bucket: AWS_S3_IMAGE_BUCKET_NAME,
        Key: fileName
    }).promise();
}
