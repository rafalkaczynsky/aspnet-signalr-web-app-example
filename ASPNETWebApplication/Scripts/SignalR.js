
(function () {
    //decalare proxy to reference the hub
    var chat = $.connection.myFirstHub;

    //Create a function that the hub can call to broadcast messages
    chat.client.broadcastMessage = function (name, message) {
        console.log(name);
        console.log(message);
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        $('#discussion').append('<li><strong>' + encodedName + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    }
    // Get the user name and store it to prepend to message
    $('#displayname').val(prompt('Enter your name: ', ''));

    $('#message').focus();

    $.connection.hub.start()
        .done(function () {
            writeToPage("#welcome-messages", "Connection established with Hub");
            // display username
            var userName = $('#displayname').val();
            $('#username').text(userName);

            $('#sendmessage').click(function () {
                console.log('Clicked!')
                //call the send message on the hub
                chat.server.send($('#displayname').val(),  $('#message').val());
                //Clear text box nad reset focus for next comment
                $('#message').val('').focus();
            })
        })
        .fail(function (e) {
            writeToPage("#welcome-messages", e)
        });


    var writeToPage = function (id, text) {
        $(id).append(text + "<br />");
    }

})();