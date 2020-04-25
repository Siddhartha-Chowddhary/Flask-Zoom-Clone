from Imports import *
from App_Settings import *
from Routing import *

@Login_Manager.user_loader
def Load_User(user_id):
  return User.query.get(int(user_id))

class User(db.Model, UserMixin):
  
  id = db.Column(db.Integer, primary_key=True)
  
  Full_Name = db.Column(db.String(50), unique=False, nullable=False)
  # Phonenumber = db.Column(db.String(50), unique=True, nullable=False)
  
  # Social_Media_Link = db.Column(db.String(50), unique=True, nullable=False)
  # Workplace = db.Column(db.String(20), unique=False, nullable=False)


  Email = db.Column(db.String(120), unique=True, nullable=False)
  
  Username = db.Column(db.String(20), unique=True, nullable=False)
  Password = db.Column(db.String(60), unique=False, nullable=False)

  post = db.relationship('Posts', backref='Author', lazy=True)

  def __repr__(self):
    return f"User('{self.Full_Name}','{self.Username}','{self.Email}')"

class Posts(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  Title = db.Column(db.String(120), unique=True, nullable=False)

  Date_Posted = db.Column(db.DateTime, unique=True, nullable=False, default = datetime.utcnow)
  Content = db.Column(db.Text, nullable=False)

  User_Id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)

  def __repr__(self):
    return f"User('{self.Title}', '{self.Date_Posted}','{self.Content}')"




class Meeting(db.Model, UserMixin):
  
  __bind_key__ = 'MeetingRoomID'

  id = db.Column(db.Integer, primary_key=True)
  
  Meeting_ID = db.Column(db.String(50), unique=True, nullable=False)
 
  # post = db.relationship('Posts', backref='Author', lazy=True)  

  def __repr__(self):
    return f"Meeting('{self.Meeting_ID}')"

