import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime";

const client = new S3Client({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export const uploadFileToS3 = async (file, appId) => {
  // Determine the content type based on file extension
  const ContentType = mime.getType(file.name) || "application/octet-stream";

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `${appId}/${file.name}`,
    Body: file,
    ContentType,
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error(err);
  }
};
