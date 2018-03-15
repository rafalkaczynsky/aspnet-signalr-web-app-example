
(function () {
    $.connection.hub.start()
        .done(function () {
            writeToPage("#welcome-messages", "Connection established with Hub");

            $.connection.myFirstHub.server.announce("Connected with myFirstHub");
        })
        .fail(function (e) {
            writeToPage("#welcome-messages", e)
        });

    $.connection.myFirstHub.client.announce = function (message) {
        writeToPage("#welcome-messages", message)
    }


    $("#super-button").click(function () {

        var messageFromInput = $("#chat-input").val();
        console.log(messageFromInput);
        $.connection.myFirstHub.server.announce(messageFromInput);

        $.connection.myFirstHub.client.announce = function (message) {
            writeToPage("#chat-messages", message)
        }
    });


    var writeToPage = function (id, text) {
        $(id).append(text + "<br />");
    }

})();