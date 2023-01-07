from flask import Flask
from server.config import Config
from server.blueprints import main, recipes, user

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(main.m)
app.register_blueprint(recipes.r)
app.register_blueprint(user.u)


from server import error