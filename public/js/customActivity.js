define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = {};
    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    //connection.on('clickedNext', save);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
   
    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');

        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');

    }

    function initialize(data) {
        console.log(data);
        if (data) {
            payload = data;
        }
        
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log(inArguments);

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                
              
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }
    
    function onClickedNext() {
        save();
        connection.trigger('nextStep');
    }

    function onClickedBack() {
        connection.trigger('prevStep');
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function save() {
        console.log("Entered Save");
       // var postcardURLValue = $('#postcard-url').val();
       // var postcardTextValue = $('#postcard-text').val();

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "emailAddress": "{{Contact.key}}",
            "FirstName": "{{Contact.Attribute.CCSPOC.FirstName}}",
            "LastName": "{{Contact.Attribute.Consent.LastName}}"
        }];
        
        payload['metaData'].isConfigured = true;

        console.log("Payload : " + payload);
        connection.trigger('updateActivity', payload);
        console.log("Exit Save");
    }


});
