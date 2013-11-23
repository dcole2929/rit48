import json
import os

from flask import Flask, g, jsonify, render_template, request, abort

import rethinkdb as r
from rethinkdb.errors import RqlRuntimeError, RqlDriverError

#### Connection details

# We will use these settings later in the code to connect to the
# RethinkDB server.
RDB_HOST =  os.environ.get('RDB_HOST') or 'localhost'
RDB_PORT = os.environ.get('RDB_PORT') or 28015
APP_DB = 'rit48app'

#### Setting up the app database

def dbSetup():
    connection = r.connect(host=RDB_HOST, port=RDB_PORT)
    try:
        r.db_create(APP_DB).run(connection)
        r.db(APP_DB).table_create('events').run(connection)
        r.db(APP_DB).table_create('users').run(connection)
        print 'Database setup completed. Now run the app without --setup.'
    except RqlRuntimeError:
        print 'App database already exists. Run the app without --setup.'
    finally:
        connection.close()

app = Flask(__name__, template_folder="static/templates")
app.config.from_object(__name__)

#### Managing connections

@app.before_request
def before_request():
    try:
        g.rdb_conn = r.connect(host=RDB_HOST, port=RDB_PORT, db=APP_DB)
    except RqlDriverError:
        abort(503, "No database connection could be established.")

@app.teardown_request
def teardown_request(exception):
    try:
        g.rdb_conn.close()
    except AttributeError:
        pass

#### Managing routes

#### Listing existing events
@app.route("/events", methods=['GET'])
def get_events():
    selection = list(r.table('events').run(g.rdb_conn))
    return json.dumps(selection)

#### Creating an event
@app.route("/events", methods=['POST'])
def new_event():
    inserted = r.table('events').insert(request.json).run(g.rdb_conn)
    return jsonify(id=inserted['generated_keys'][0])

#### Retrieving a single event
@app.route("/events/<string:event_id>", methods=['GET'])
def get_event(event_id):
    event = r.table('events').get(event_id).run(g.rdb_conn)
    return json.dumps(event)

#### Editing/Updating an event
@app.route("/events/<string:event_id>", methods=['PUT'])
def update_event(event_id):
    return jsonify(r.table('events').get(event_id).replace(request.json).run(g.rdb_conn))

@app.route("/events/<string:event_id>", methods=['PATCH'])
def patch_event(event_id):
    return jsonify(r.table('events').get(event_id).update(request.json).run(g.rdb_conn))

#### Deleting an event
@app.route("/events/<string:event_id>", methods=['DELETE'])
def delete_event(event_id):
    return jsonify(r.table('events').get(event_id).delete().run(g.rdb_conn))

@app.route('/')
def home():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(port=8181, debug=True)