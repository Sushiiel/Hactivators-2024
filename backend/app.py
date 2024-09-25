from flask import Flask, request, send_file
import os
import subprocess
import tempfile
import boto3
from botocore.exceptions import NoCredentialsError

app = Flask(__name__)

# AWS S3 Configuration
AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
AWS_S3_BUCKET = 'myawsstestings3'
S3_REGION = 'eu-north-1'  # e.g., 'us-east-1'

s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=S3_REGION
)

@app.route('/getvid', methods=['GET'])
def send_manim_file():
    # You might not need this anymore if you always upload to S3.
    pass

@app.route('/render', methods=['POST'])
def render_manim():
    try:
        # Get Manim code from request body
        manim_code = request.data.decode("utf-8")

        # Create a temporary directory to store files
        temp_dir = tempfile.mkdtemp()

        # Create a temporary Python file with the Manim code
        temp_file_path = os.path.join(temp_dir, "scene.py")
        with open(temp_file_path, "w") as temp_file:
            temp_file.write(manim_code)

        # Run the Manim render command to generate the video
        output_file_name = "out_file.mp4"
        output_path = r"E:\Projects\Hactivators-2024\backend\media\videos\scene\1080p60\out_file.mp4"

        # Call Manim using subprocess to render the video
        command = [
            "manim", 
            temp_file_path, 
            "out_file",
            "-o", 
            output_file_name
        ]

        # Execute the Manim command
        subprocess.run(command, check=True)

        # Upload the file to S3
        s3_key = f"videos/{output_file_name}"  # Change this path as needed
        s3_client.upload_file(output_path, AWS_S3_BUCKET, s3_key)

        # Create a public URL for the uploaded file
        s3_url = f"https://{AWS_S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{s3_key}"

        # Return the public URL of the uploaded video
        return {"url": s3_url}, 200

    except NoCredentialsError:
        return {"error": "AWS credentials not available."}, 403
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)
