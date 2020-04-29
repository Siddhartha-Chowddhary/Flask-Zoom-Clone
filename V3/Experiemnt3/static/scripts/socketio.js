document.addEventListener('DOMContentLoaded', () =>{

    var Chatsocket = io.connect('http://' + document.domain + ':' + location.port);


    y =  document.getElementById("select-room").text;
    let room = y;
    console.log(y);
    JoinRoom(document.getElementById("select-room").text)
    // socket.on('connect', () =>{

    //     socket.send("I am connected!");

    // });
//Displays Incomming Messages
    Chatsocket.on('message', data =>{

        // console.log(`Message Received: ${data}`)
        const p = document.createElement('p');
        const Span_Username = document.createElement('span');
        const TimeStamp_Username = document.createElement('span');

        const br = document.createElement('br');

        if (data.username){

            Span_Username.innerHTML = data.username;
            TimeStamp_Username.innerHTML = data.time_stamp;

            p.innerHTML = Span_Username.outerHTML + br.outerHTML +  data.msg +br.outerHTML + TimeStamp_Username.outerHTML;
            document.querySelector('#display-message-section').append(p)

        }
        else {

            printSysMsg(data.msg);
        }

    });


    document.querySelector('#SendMsg').onclick = () => {

        var messages = document.querySelector('#user-message').value;
        var username = document.getElementById("USERNAMES").text;

        Chatsocket.send({'msg':messages,
        'username': username, 'room':room });

        document.querySelector('#user-message').value = '';

    }

//Room Selection
    document.querySelectorAll('#GTP').forEach(p => {
        p.onclick = () => {

           leaveRoom(room);
        }
    })


    function leaveRoom(room){
        var username = document.getElementById("USERNAMES").text;

        Chatsocket.emit('leave', {'username': username, 'room': room});

    }
    function JoinRoom(room){
        var username = document.getElementById("USERNAMES").text;

        Chatsocket.emit('join', {'username': username, 'room': room});
        //clear meassage area
        document.querySelector('#display-message-section').innerHTML = ''

    }

    //print system messages
    function printSysMsg(msg){
        const p = document.createElement('p');
        p.innerHTML = msg;
        document.querySelector('#display-message-section').append(p)
    }

})
