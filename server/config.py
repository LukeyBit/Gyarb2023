import os
class Config:
    SECRET_KEY = 'vHmF4AVkRH'
    UPLOAD_FOLDER = 'server/static/images/profile_pictures'
    MAX_CONTENT_LENGTH = 1000000
    ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif'}
    DB_PATH = os.path.join(os.path.dirname(os.path.realpath(__file__)), "database", "server.db")
    DEFAULT_IMG = 'static/images/profile_pictures/default.png'