from flask import Blueprint

u = Blueprint('user', __name__)

@u.route('/user')
def user():
    return 'This is the user page'