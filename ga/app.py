import os
import time
import secrets
from werkzeug.utils import secure_filename

from flask import Flask, request, flash, sessions, url_for, jsonify, Response, send_from_directory
from flask_cors import CORS
from tasks import celery

secret = secrets.token_urlsafe(32)

app = Flask(__name__)
CORS(app)
app.secret_key = secret

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# celery.conf.update(app.config)


# Check if a file extension is allowed.
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Uploading or retrieving the image.
@app.route('/image', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return jsonify({'status': 'error', 'message': 'No file part'}), 400
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return jsonify({'status': 'error', 'message': 'No selected file'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(str(time.time()).rsplit(
                '.', 1)[0] + '.' + file.filename.rsplit('.', 1)[1])
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify({'status': 'success', 'filename': filename}), 200
    if request.method == 'GET':
        if 'filename' in request.args:
            filename = request.args['filename']
            return send_from_directory(app.config['UPLOAD_FOLDER'], filename), 200
    return Response(status=400)


# Root route.
@app.route('/')
def index():
    return jsonify({'status': 'success', 'message': 'Welcome motherfucker to the PyGAD & GARI for Reproducing Images'})


# Route for running the genetic algorithm.
@app.route('/run', methods=['POST'])
def run():
    task = celery.send_task('tasks.run_ga', args=[
                            request.json['filename'], request.json['generation'], request.json['split']])
    return jsonify({'task_id': task.id}), 202, {'Location': url_for('taskstatus', task_id=task.id)}


# Route for getting the status of the genetic algorithm.
@app.route('/status/<task_id>', methods=['GET'])
def taskstatus(task_id):
    task = celery.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'current_generation': 0,
            'target_generatiion': 0,
            'current_fitness': 0,
            'sol_im': [],
            'status': 'Pending...'
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'current_generation': task.info.get('current_generation', 0),
            'target_generatiion': task.info.get('target_generatiion', 1),
            'current_fitness': task.info.get('current_fitness', 0),
            'sol_im': task.info.get('sol_im', []),
            'status': task.info.get('status', '')
        }
        if 'result' in task.info:
            response['result'] = task.info.get('result', '')
        # if task.info.get('status', '') == 'Completed':
    else:
        # something went wrong in the background job
        response = {
            'state': task.state,
            'current_generation': 1,
            'target_generatiion': 1,
            'current_fitness': 1,
            'sol_im': [],
            'status': str(task.info)  # this is the exception raised
        }
    return jsonify(response)


if __name__ == '__main__':
    print('Starting the server...')
    print('Server is running on port 5000')
    print('Press Ctrl+C to quit')
    print(f'UPLOAD_FOLDER: {UPLOAD_FOLDER}')
    print('------------------------------------------------------')
    # app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.config['SESSION_TYPE'] = 'redis'
    app.run(host='0.0.0.0', port=5000, debug=True)
