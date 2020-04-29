from Imports import *
from App_Settings import *
from Routing import *
from Database import *
from Auth import *
import configparser as cfg
from engineio.payload import Payload

# Payload.max_decode_packets = 50000



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
    print(f"\n\n{data}\n\n")
    leave_room(data['room'])
    send({'msg': data['username'] + "Has left the" +
        data['room'] + "room."},  room=data['room'])






@app.route('/video_chat/<CURRENT_ROOM>')
def video_chat(CURRENT_ROOM):
    """Render the app"""
    current_rooms = CURRENT_ROOM
    print(current_user.Username)
    text_file = open(f"E:/Zeus/Video_Call/InterWeb/Experiemnt3/static/Rooms/{current_user.Username}/videoRoom.txt", "w")
    n = text_file.write(current_rooms)
    text_file.close()

    text_file2 = open(f"E:/Zeus/Video_Call/InterWeb/Experiemnt3/static/Rooms/{current_user.Username}/videoRoom.txt", "r")

    ROOM_NAME = text_file2.read()
    print(ROOM_NAME)

    return render_template('Video_Chat.html',  USERS = current_user.Username, rooms=ROOM_NAME)



@socketio.on('Video')
def Video(data):

    # print(f"\n\n{data}\n\n")
    emit('RoomVideo', { 'videos': data['Image']}, room=data['room'])

#, 'CDiv':data['Canvas_div'], 'VCanvas':data['Canvas']

@socketio.on('joinVideo')
def joinVideo(data):

    join_room(data['room'])
    emit('RoomVideostatus',{'msg': data['username'] + "Has joined the" +
        data['room'] + "room."}, room=data['room'])



@socketio.on('leaveVideo')
def leaveVideo(data):
    print(f"\n\n{data}\n\n")
    leave_room(data['room'])
    emit('RoomVideostatus', {'msg': data['username'] + "Has left the" +
        data['room'] + "room."},  room=data['room'])
