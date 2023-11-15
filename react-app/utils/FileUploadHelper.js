import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const client = new S3Client({
  region: 'us-west-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

export const uploadFileToS3 = async (file) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: file.name,
    Body: file,
  })

  try {
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}