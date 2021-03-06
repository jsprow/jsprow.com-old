$(document).ready(function() {
    //##### send add record Ajax request to response.php #########
    $("#inSubmit").click(function(e) {
        e.preventDefault();
        if ($("#contentText").val() === '') {
            $("#error_box").html('<p id="error">Whatsyername?</p>');
            $("#error_box").slideDown();
            return false;
        }
        $("#inSubmit").fadeOut(); //hide submit button
        var contentText = $("#contentText").val();
        var inOut = "in";
        var date = new Date();
        var timeStamp = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        var myData = { //build a post data structure
            content_txt: contentText,
            time_stamp: timeStamp,
            in_out: inOut
        };
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "response.php", //Where to make Ajax calls
            dataType: "text", // Data type, HTML, json etc.
            data: myData, //Form variables
            success: function(response) {
                $("#responds").load("index.php #responds > *");
                $("#contentText").val(''); //empty text field on successful
                $("#inSubmit").fadeIn(); //show submit button
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#inSubmit").show(); //show submit button
                console.warn(thrownError, xhr.responseText);
            }
        });
    });
    $("#outSubmit").click(function(e) {
        e.preventDefault();
        if ($("#contentText").val() === '') {
            $("#error_box").slideDown();
            $("#error_box").html('<p id="error">Whatsyername?</p>');
            return false;
        }
        $("#outSubmit").fadeOut(); //hide submit button
        var contentText = $("#contentText").val();
        var inOut = "out";
        var date = new Date();
        var timeStamp = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() + "&nbsp;" + date.getHours() + ":" + date.getMinutes();
        var myData = { //build a post data structure
            content_txt: contentText,
            time_stamp: timeStamp,
            in_out: inOut
        };
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "out_response.php", //Where to make Ajax calls
            dataType: "text", // Data type, HTML, json etc.
            data: myData, //Form variables
            success: function(response) {
                $("#responds").load("index.php #responds > *");
                $("#contentText").val(''); //empty text field on successful
                $("#outSubmit").fadeIn(); //show submit button
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $("#outSubmit").show(); //show submit button
                console.warn(thrownError, xhr.responseText);
            }
        });
    });
    //##### Send delete Ajax request to response.php #########
    $("body").on("click", "#responds .del_button", function(e) {
        e.preventDefault();
        var clickedID = this.id.split('-'); //Split ID string (Split works as PHP explode)
        var DbNumberID = clickedID[1]; //and get number from array
        var myData = 'recordToDelete=' + DbNumberID; //build a post data structure
        $('#item_' + DbNumberID).addClass("sel"); //change background of this element by adding class
        $(this).hide(); //hide currently clicked delete button
        jQuery.ajax({
            type: "POST", // HTTP method POST or GET
            url: "response.php", //Where to make Ajax calls
            dataType: "text", // Data type, HTML, json etc.
            data: myData, //Form variables
            success: function(response) {
                //on success, hide  element user wants to delete.
                $('#item_' + DbNumberID).fadeOut();
            },
            error: function(xhr, ajaxOptions, thrownError) {
                //On error, we alert user
                alert(thrownError);
            }
        });
    });
    $(document).keyup(function() {
        if ($("#error_box").is(':visible')) {
            $("#contentText").keyup(function() {
                $("#error_box").slideUp();
            })
        }
    });
});