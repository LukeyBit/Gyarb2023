from server.config import Config
import sqlite3
import bcrypt

def create_connection(db_file=Config.DB_PATH):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except sqlite3.Error as e:
        print(e)
    return conn