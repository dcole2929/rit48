import json
import os

import calendar
from datetime import datetime

import random

from flask import Flask, g, jsonify, render_template, request, abort

import rethinkdb as r

RDB_HOST =  os.environ.get('RDB_HOST') or 'localhost'
RDB_PORT = os.environ.get('RDB_PORT') or 28015
APP_DB = 'rit48app'

r.connect( "localhost", 28015).repl()

def create_events_table():
	r.db('rit48app').table_create('events').run()

def drop_events_table():
	r.db('rit48app').table_drop('events').run()

EVENTS = ['Poker', 'Pool', 'Darts', 'Shuffleboard']
ADJECTIVES = ['Fun', 'Spicy', 'Big', 'Super']
FIRST_NAMES = ['Jason', 'Doug', 'Fred', 'Tom', 'Jake']
LAST_NAMES = ['Smith', 'Farmer', 'Johnson', 'Donaldson']
INTERESTS = ['Boardgames', 'Videogames', 'Coffee', 'Dancing', 'Fun', 'Chill']

def get_name():
	return random.choice(FIRST_NAMES) + ' ' + random.choice(LAST_NAMES)

def event_generator():
	while True:
		event = {}
		event['title'] = random.choice(ADJECTIVES) + ' ' + random.choice(EVENTS)
		event['time'] = str(calendar.timegm(datetime.utcnow().utctimetuple()))
		event['place'] = 'c'
		event['description'] = 'd'
		event['attendants'] = [get_name() for _ in xrange(random.randint(1, 3))]
		event['picture'] = 'f'
		event['rating'] = 5
		event['interests'] = random.sample(INTERESTS, random.randint(1, len(INTERESTS)))
		event['owner'] = event['attendants'][0]
		yield event

def add_events(count):
	gen = event_generator()
	for _ in xrange(count):
		event = next(gen)
		r.db('rit48app').table("events").insert(event).run()

if __name__ == '__main__':
	drop_events_table()
	create_events_table()
	add_events(50)
