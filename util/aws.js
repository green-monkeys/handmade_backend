import {S3, config} from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

config.update({
    region: 'us-west-1',
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
        metadata: function (req, file, cb) {
            cb(null, {fieldname: file.fieldname})
        },
        key: async function (req, file, cb) {
            const fileName = `${req.baseUrl.replace('/', '')}/${await getUniqueFilenameForFolder(req.baseUrl.replace('/', ''))}`;
            cb(null, fileName);
        }
    })
});


const params = {
    Bucket: AWS_S3_IMAGE_BUCKET_NAME,
    Delimiter: '/',
};

async function getUniqueFilenameForFolder(folder) {
    const currentParams = {
        ...params,
        Prefix: `${folder}/`
    };
    const objects = await s3.listObjects(currentParams).promise();
    const existingFiles = objects.Contents.map(file => file.Key);
    let fileName = `${generateRandomString(64)}.jpg`;
    while (existingFiles.includes(`${folder}/${fileName}`)) {
        fileName = generateRandomString(64);
    }
    return fileName;
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getImage(res, folder, file) {
    const fileName = `${folder}/${file}`;
    return s3.getObject({
        Bucket: AWS_S3_IMAGE_BUCKET_NAME,
        Key: fileName
    }).promise();
}

export function deleteImage(url) {
    const regex = /https:\/\/(.+)\.s3\.us-west-1\.amazonaws\.com\/(.+)/g;
    const matches = regex.exec(url);
    if (matches.length !== 3) {
        return;
    }

    const params = {
        Bucket: matches[1],
        Key: matches[2]
    };
    return s3.deleteObject(params).promise();
}
