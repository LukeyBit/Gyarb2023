from flask import Blueprint

m = Blueprint('main', __name__)

@m.route('/')
def index():
    return 'This is the index page'