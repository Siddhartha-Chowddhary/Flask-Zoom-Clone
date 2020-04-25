from Imports import *

app = Flask(__name__)
app.config['SECRET_KEY'] = '657413574sfdsdf6b34c48587f015be5d62694e08d198a1a4d215af19a1555'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_BINDS'] = {'MeetingRoomID': 'sqlite:///Meeting.db'}


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
Login_Manager = LoginManager(app)

socketio = SocketIO(app)

ROOMS = ["Games", "Programming", "Sports"]