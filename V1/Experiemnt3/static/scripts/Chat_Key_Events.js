document.addEventListener('DOMContentLoaded', () => {


    // Make 'enter' key submit message
    let msg = document.getElementById("user_message");
    msg.addEventListener('keyup', event => {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("SendMsg").click();
        }
    });
});