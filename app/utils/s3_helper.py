import os
import boto3
from flask import Response
from botocore.exceptions import NoCredentialsError, ClientError

S3_ACCESS_KEY_ID = os.environ.get("S3_ACCESS_KEY_ID")
S3_SECRET_ACCESS_KEY = os.environ.get("S3_SECRET_ACCESS_KEY")
S3_BUCKET_TEMP = os.environ.get("S3_BUCKET_TEMP")
S3_BUCKET_PERMANENT = os.environ.get("S3_BUCKET_PERMANENT")
S3_REGION = os.environ.get("S3_REGION")

def get_s3_client():
    return boto3.client(
        's3',
        aws_access_key_id=S3_ACCESS_KEY_ID,
        aws_secret_access_key=S3_SECRET_ACCESS_KEY,
        region_name=S3_REGION
    )

def get_s3_object(key, app_id):
    try:
        s3_client = get_s3_client()

        # Specify additional headers if needed

        # Make a request to S3
        s3_response = s3_client.get_object(Bucket=S3_BUCKET_PERMANENT, Key= f'{app_id}/{key}')

        # Create a Flask response from the S3 response
        response = Response(
            s3_response['Body'].read(),
            status=s3_response['ResponseMetadata']['HTTPStatusCode'],
            headers={key: value for key, value in s3_response['ResponseMetadata']['HTTPHeaders'].items() if key.lower() not in ['content-encoding', 'transfer-encoding', 'content-length']}
        )

        return response, 200

    except NoCredentialsError:
        return "Credentials not available.", 500

    except ClientError as e:
    # Check if the error code indicates that the object doesn't exist
        if e.response['Error']['Code'] == 'NoSuchKey':
            return "Object not found in S3 bucket.", 404  # Return a 404 status code


def copy_s3_object(key, app_id):

    try:
        s3_client = get_s3_client()

        # Specify additional headers if needed

        # Make a request to S3
        s3_client.copy_object(
                    Bucket=S3_BUCKET_PERMANENT,
                    CopySource={'Bucket': S3_BUCKET_TEMP, 'Key': f'{app_id}/{key}'},
                    Key=f'{app_id}/{key}'  # Optionally, you can specify a different key for the destination
                )

        return
    except Exception as e:
            return {'error': str(e)}, 500




def delete_s3_object(key, app_id):
    try:
        # Create an S3 client
        s3_client = get_s3_client()

        # Delete the object
        s3_client.delete_object(Bucket=S3_BUCKET_PERMANENT, Key= f'{app_id}/{key}')

        print("File deleted")

    except NoCredentialsError:
        print("Credentials not available.")
