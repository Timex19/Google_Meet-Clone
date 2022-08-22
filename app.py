#!/usr/bin/env python3
"""Module for flask app."""
import os
import uuid
from dotenv import load_dotenv
from flask import jsonify
from flask import Flask, render_template, request, abort
from twilio.rest import Client
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant


load_dotenv()
twilio_auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
twilio_account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
twilio_api_key_sid = os.environ.get("TWILIO_API_KEY_SID")
twilio_api_key_secret = os.environ.get("TWILIO_API_KEY_SECRET")


app = Flask(__name__)
client = Client(twilio_account_sid, twilio_auth_token)
rooms_unique_names = ["1234"]


@app.route("/", strict_slashes=False)
def index():
    """GET /
    Return: notGoogle's landing page.
    """
    return render_template("index.html")


@app.route("/new_room", methods=["GET"], strict_slashes=False)
def new_room():
    """GET /new_room
    Generates a unique name for a room
    Return: A json payload with the generated name.
    """
    unique_name = str(uuid.uuid4())
    rooms_unique_names.append(unique_name)
    return jsonify({"unique_name": unique_name})


@app.route("/access/<string:room_unique_name>", methods=["POST"],
           strict_slashes=False)
def access_room(room_unique_name):
    """POST /access/<string:room_unique_name>.
    Creates a new room with the unique name passed in the url.
    Returns:
        - 401 HTTP status code if the POST data is lacking a 'fullname'
        - 404 HTTP status code if no room with passed unique name exists
        - A JSON payload containing a token.
    """
    fullname = request.get_json(force=True).get("fullname")
    if not fullname:
        abort(401)
    if room_unique_name not in rooms_unique_names:
        return abort(404, description="Room not found")

    token = AccessToken(
        twilio_account_sid,
        twilio_api_key_sid,
        twilio_api_key_secret,
        identity=fullname,
        ttl=86400,
    )
    token.add_grant(VideoGrant(room=room_unique_name))

    return {"token": token.to_jwt()}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
