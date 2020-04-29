document.addEventListener('DOMContentLoaded', () =>{

 var socket = io.connect('http://' + document.domain + ':' + location.port);

 var username = document.getElementById("USERNAMES").text;

let video = document.getElementById("videoInput"); // video is the id of video tag
let video_output = document.getElementById("canvasOutput");


y =  document.getElementById("select-room").text;
let room = y;
console.log(y);
JoinVideoRoom(document.getElementById("select-room").text)

let client_video_output = document.getElementById(username);
var ctx = client_video_output.getContext("2d");

video.width = 640;
video.height = 480;
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function(stream) {
    video.srcObject = stream;
    video.play();

    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    let cap = new cv.VideoCapture(video);

    const FPS = 30;
    setInterval(() => {

        let begin = Date.now();
        // start processing.
        cap.read(src);
        // cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow("canvasOutput", src);
        // schedule the next one.



        let b64image = video_output.toDataURL()
        // console.log(b64image)
        socket.emit('Video', {'Image': b64image,  'room':room});


    // schedule the first one.

}, 100);
})
  .catch(function(err) {
    console.log("An error occurred! " + err);
  });




  socket.on('RoomVideo', data => {

    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image,10, 10, 150, 180);
    };
    console.log('data', data);
    image.src = `${data.videos}`;




});


socket.on('RoomVideostatus', data => {

    const p = document.createElement('p');
    const Span_Username = document.createElement('span');
    const TimeStamp_Username = document.createElement('span');

    const br = document.createElement('br');

    if (data.username){

        Span_Username.innerHTML = data.username;
        TimeStamp_Username.innerHTML = data.time_stamp;

        p.innerHTML = Span_Username.outerHTML + br.outerHTML +  data.msg +br.outerHTML ;
        document.querySelector('#display-message-section').append(p)

    }
    else {

        printVideoSysMsg(data.msg);
    }});


document.querySelectorAll('#GTP').forEach(p => {
    p.onclick = () => {

       leaveVideoRoom(room);
    }
})





function leaveVideoRoom(room){
    var username = document.getElementById("USERNAMES").text;

    socket.emit('leaveVideo', {'username': username, 'room': room});

}
function JoinVideoRoom(room){
    var username = document.getElementById("USERNAMES").text;

    const User =  document.createElement('div');
    User.id = 'USERS';

    const Usercanvas = document.createElement('canvas')
    Usercanvas.id = `${username}`;

    User.innerHTML = Usercanvas.outerHTML;
    document.querySelector('#display-Video-section').append(User);

    socket.emit('joinVideo', {'username': username, 'room': room});
    //clear meassage area
    document.querySelector('#display-message-section').innerHTML = ''

}

//print system messages
function printVideoSysMsg(msg){
    const p = document.createElement('p');
    p.innerHTML = msg;
    document.querySelector('#display-message-section').append(p)
}




})
// document.addEventListener('DOMContentLoaded', () =>{
// // Adapted from https://docs.opencv.org/3.4/dd/d00/tutorial_js_video_display.html
// var socket = io.connect('http://' + document.domain + ':' + location.port);

// let video = document.getElementById("videoInput");
// let video_output = document.getElementById("canvasOutput");
// video.height = 480;
// navigator.mediaDevices
//   .getUserMedia({ video: true, audio: false })
//   .then(function(stream) {
//     video.srcObject = stream;
//     video.play();

//     let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
//     let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
//     let cap = new cv.VideoCapture(video);
//     console.log(cap);

//     const FPS = 30;







// setInterval(() => {



//     console.log(src);
//     cap.read(src);
//     cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
//     cv.imshow("canvasOutput", dst);
//     let b64image = video_output.toDataURL()
//     console.log(b64image)
//     socket.emit('Video', {'Image': b64image});

// // Grab elements, create settings, etc.
// var video = document.getElementById('video');


// }, 100);
// })
// .catch(function(err) {
// console.log("An error occurred! " + err);
// });


// // document.querySelectorAll('#GTP').forEach(p => {
// // p.onclick = () => {

// //    leaveRoom(room);
// // }

// // })
//     // function processVideo() {
//     //     try {
//     //       // if (!streaming) {
//     //       //   // clean and stop.
//     //       //   src.delete();
//     //       //   dst.delete();
//     //       //   return;
//     //       // }
//     //       let begin = Date.now();
//     //       // start processing.
//     //       cap.read(src);
//     //       cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
//     //       cv.imshow("canvasOutput", dst);
//     //       // schedule the next one.
//     //       let delay = 1000 / FPS - (Date.now() - begin);
//     //       setTimeout(processVideo, delay);
//     //     } catch (err) {
//     //       console.error(err);
//     //     }
//     //   }

//       // schedule the first one.
//     //   setTimeout(processVideo, 0);




// socket.on('Video', data => {

//     var image = new Image();
//     image.onload = function() {
//       ctx.drawImage(image, 0, 0);
//     };
//     console.log('data', data);
//     iamge.src = `data:image/jpg;base64,${data.videos}`

// });

// // function leaveRoom(room){
// //     var username = document.getElementById("USERNAMES").text;

// //     socket.emit('leave', {'username': username, 'room': room});

// // }
// // function JoinRoom(room){
// //     var username = document.getElementById("USERNAMES").text;

// //     socket.emit('join', {'username': username, 'room': room});
// //     //clear meassage area
// //     document.querySelector('#display-message-section').innerHTML = ''

// // }

// // //print system messages
// // function printSysMsg(msg){
// //     const p = document.createElement('p');
// //     p.innerHTML = msg;
// //     document.querySelector('#display-message-section').append(p)
// // }


// // // function opencvIsReady() {


// // //   console.log('OpenCV.js is ready');


// // // //   startCamera();
// // // }

// })
