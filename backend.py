from flask import Flask, render_template, request, redirect, url_for, session  # type: ignore
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length
from werkzeug.security import generate_password_hash, check_password_hash
from flask_session import Session  # Import Session for Flask-Session

app = Flask(__name__)

# Configuration for Flask and Flask-Session
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'

# Initialize Flask-Session
Session(app)

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=80)])
    submit = SubmitField('Login')

# A simple in-memory user database (replace with a real database)
users = {
    'user1': generate_password_hash('password1'),
    'user2': generate_password_hash('password2')
}

@app.route('/', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        if username in users and check_password_hash(users[username], password):
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            return 'Invalid username or password'
    return render_template('login.html', form=form)

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return f'Welcome {session["username"]}!'
    else:
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
