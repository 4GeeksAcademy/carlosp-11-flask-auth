"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()
    email = data['email'].lower()
    is_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if is_user:
        response_body = {'message': 'The email is registered'}
        return response_body, 403
    user = Users(email=data['email'], 
                     password=data['password'], 
                     is_active=True)
    db.session.add(user)
    db.session.commit()
    response_body = {'message': 'User created'}
    return response_body, 201


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Consultar la tabla user para ver si el email, el password y el usuario está activo
    
    user = db.one_or_404(db.select(Users).filter_by(email=email, password=password, is_active=True),
                         description=f"Bad email or password.")
    access_token = create_access_token(identity=email)
    response_body = {"message": "login ok", 
                     "access_token": access_token}
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body = {"message": "access ok",
                     "logged_in_as": current_user}
    return response_body, 200
