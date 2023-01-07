from flask import Blueprint

r = Blueprint('recipes', __name__)

@r.route('/recipes')
def recipes():
    return 'This is the recipes page'