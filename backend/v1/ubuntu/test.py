from flask import Flask, request, jsonify
import os
import subprocess
import tempfile
import shutil  # Import shutil
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

app = Flask(__name__)

# Initialize S3 client
s3_client = boto3.client('s3')
BUCKET_NAME = 'your-bucket-name'  # Replace with your S3 bucket name

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

        # Set the hardcoded output path
        output_path = "/home/ubuntu/Hactivators-2024/backend/media/videos/scene/1080p60/PythagorasTheorem.mp4"

        # Call Manim using subprocess to render the video
        command = [
            "manim", 
            temp_file_path, 
            "PythagorasTheorem",
            "-o", 
            output_path
        ]

        # Execute the Manim command
        subprocess.run(command, check=True)

        # Upload the video file to S3
        s3_key = f"videos/PythagorasTheorem.mp4"  # Set the path in S3 bucket
        s3_client.upload_file(output_path, BUCKET_NAME, s3_key)

        # Generate the URL for the uploaded video
        video_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # Clean up temporary files
        os.remove(temp_file_path)
        shutil.rmtree(temp_dir)  # Use shutil.rmtree to remove the directory and its contents

        # Return the video URL
        return jsonify({"video_url": video_url})

    except (NoCredentialsError, PartialCredentialsError) as e:
        return {"error": "AWS credentials not found."}, 500
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
