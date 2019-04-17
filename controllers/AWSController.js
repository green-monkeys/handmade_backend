import {S3, config} from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

config.update({
    region: 'us-west-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    signatureVersion: 'v4'
});

export const s3 = new S3();

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'capstone406',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldname: file.fieldname})
        },
        key: function(req, file, cb) {
            const fileName = `${req.query.folder}/${file.originalname}`;
            cb(null, fileName);
        }
    })
});

export function storeImage(req, res) {
    res.status(200).json({
        message: "Successfully Uploaded."
    });
}

export function getImage(res, folder, file) {
    const fileName = `${folder}/${file}`;
    s3.getObject({
        Bucket: 'capstone406',
        Key: fileName
    }, function(err, data) {
        if (err) {
            res.status(500).json({
                message: err.message
            });
        } else {
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.write(data.Body, 'binary');
            res.end(null, 'binary');
        }
    })
}
