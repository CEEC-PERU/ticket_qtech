const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../../config/aws'); // AWS SDK setup

exports.uploadToS3 = async (buffer, folder, fileName, contentType) => {
  try {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${fileName}`, // Path within the bucket
      Body: buffer,
      ContentType: contentType, // File type
    };

    await s3.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`;
    console.log(`File uploaded successfully: ${fileUrl}`);
    return fileUrl; // Return the public URL
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Error uploading file to S3');
  }
};
