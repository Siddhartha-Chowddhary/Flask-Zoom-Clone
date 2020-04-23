from Imports import *
from App_Settings import *
from Routing import *
from Database import *
from Auth import *


@app.route('/')
def index():
    """Render the app"""
    # form = LoginForms()
    # username = current_user.Username
    # print(username)
    return render_template('index.html') 

@app.route('/index2')
def index2():
    """Render the app"""
    # form = LoginForms()
    # username = current_user.Username
    # print(username)

    return render_template('index.html')    

@app.route('/CHAT/<CURRENT_ROOM>')
def CHAT(CURRENT_ROOM):
    """Render the app"""
    current_rooms = CURRENT_ROOM
    print(current_user.Username)
    text_file = open(f"E:/Zeus/Video_Call/InterWeb/Experiemnt3/static/Rooms/{current_user.Username}/Room.txt", "w")
    n = text_file.write(current_rooms)
    text_file.close() 

    text_file2 = open(f"E:/Zeus/Video_Call/InterWeb/Experiemnt3/static/Rooms/{current_user.Username}/Room.txt", "r")

    ROOM_NAME = text_file2.read()
    print(ROOM_NAME)

 


    return render_template('CHAT.html', USERS = current_user.Username, rooms=ROOM_NAME)  

@socketio.on('message')
def message(data):
    print(f"\n\n{data}\n\n")
    send({'msg': data['msg'], 'username':data['username'],'time_stamp':
    strftime('%b-%d %I:%M%p', localtime())}, room=data['room'])
    

@socketio.on('join')
def join(data):
    
    join_room(data['room'])
    send({'msg': data['username'] + "Has joined the" + 
        data['room'] + "room."}, room=data['room'])



@socketio.on('leave')
def leave(data):
    
    leave_room(data['room'])
    send({'msg': data['username'] + "Has left the" + 
        data['room'] + "room."},  room=data['room'])