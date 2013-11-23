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

@app.route('/')
def home():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(port=8181, debug=True)