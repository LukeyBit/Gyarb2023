from server import app
from flask import render_template

@app.errorhandler(401)
def not_found_error(error):
	return render_template('errors/401.html'), 401

@app.errorhandler(404)
def not_found_error(error):
	return render_template('errors/404.html'), 404

@app.errorhandler(413)
def payload_too_large(error):
    return render_template('errors/413.html'), 413

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('errors/500.html'), 500