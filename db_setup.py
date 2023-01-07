from server.dbhandler import create_connection
from server.config import Config
import bcrypt

conn = create_connection()
cur = conn.cursor()