'use strict';

const APP_ID = "YOUR_APP_ID"; // Like "amzn1.ask.skill.d5ccc74f-f785-471e-9735-5XX3414c6XXX"
var projectName = "DriveTime-Lambda";
const Alexa = require("alexa-sdk");
var request = require('request');

const appName = 'Drive Time';
const LAUNCH_SPEAK = 'I can help you to plan your drive.';
const FOLLOWUP_MSG = 'Please say Know My Travel Time to get started'; 
const SOURCE_MSG = 'Please say your starting point';
const DEST_MSG = 'Please say your ending point';
const HELP_SPEAK = 'This Skill, '+appName+' is developed to help everyone to know the travel time taken to reach the destination from source in current traffic';
const HELP_REPROMPT = HELP_SPEAK;
const CANCEL_SPEAK = 'Thanks for using '+appName+'. Have a nice day!';
const STOP_SPEAK = 'Thanks for using '+appName+'. Have a great day!';
const UNHANDLED_SPEAK = 'I am Sorry, Can you please repeat it';
const UNHANDLED_REPROMPT = UNHANDLED_SPEAK;

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(newSessionHandlers, travelStateHandlers);
    alexa.execute();
};

const APP_STATES = {
    TRAVELMODE: '_TRAVELMODE'
};

const newSessionHandlers = {
    'LaunchRequest': function () {
        console.log(projectName+" NewSession - Intent : LaunchRequest");
        
        this.handler.state = APP_STATES.TRAVELMODE;
        this.attributes.welcome = true;
        const speechOutput = "<say-as interpret-as=\"interjection\">"+getPartOfDay()+"</say-as><break time=\"300ms\"/>"
                            +LAUNCH_SPEAK+FOLLOWUP_MSG; 
        this.response.speak(speechOutput).listen(FOLLOWUP_MSG);
        this.emit(':responseReady');
    },
    'DriveOnTime': function () {
        console.log(projectName+" NewSession - Intent : DriveOnTime");
        
        this.handler.state = APP_STATES.TRAVELMODE;
        this.emitWithState("DriveOnTime");
    },
    'AMAZON.HelpIntent': function () {
        console.log(projectName+" NewSession - Intent : HelpIntent");
		
        this.response.speak(HELP_SPEAK).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        console.log(projectName+" NewSession - Intent : CancelIntent");
		
        this.response.speak(CANCEL_SPEAK);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        console.log(projectName+" NewSession - Intent : StopIntent");
		
        this.response.speak(STOP_SPEAK);
        this.emit(':responseReady');
    }, 
    'SessionEndedRequest': function () {
        console.log(projectName+" NewSession - Intent : SessionEndedRequest");
        console.log(`Session ended: ${this.event.request.reason}`);
		
		this.response.speak("");
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        console.log(projectName+" NewSession - Intent : Unhandled");
		
        this.response.speak(UNHANDLED_SPEAK).listen(UNHANDLED_REPROMPT);
        this.emit(':responseReady');
    }
};

const travelStateHandlers = Alexa.CreateStateHandler(APP_STATES.TRAVELMODE, {
    'DriveOnTime': function () {
        console.log(projectName+" TRAVELMODE - Intent : DriveOnTime");
        if(this.event.request.dialogState == "COMPLETED"){
            console.log("COMPLETED");
            getTimeToDestinationFromGoogle(this.event.request.intent.slots, (message) => {
                console.log("message: "+message);
                this.response.speak(message);
                this.emit(':responseReady');
            });
        } else {
            isSlotsFilled(this.event.request.intent.slots, 
                    (slotType, slotToElicit, speechOutput, repromptSpeech) => {
                if(slotType == ':elicitSlot'){
                    if(this.attributes.welcome){
                        this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
                    }else{
                        this.attributes.welcome = true;
                        const speech = "<say-as interpret-as=\"interjection\">"+getPartOfDay()+"</say-as><break time=\"300ms\"/>"
                            +LAUNCH_SPEAK+"<break time=\"300ms\"/>"; 
                        this.emit(':elicitSlot', slotToElicit, speech+speechOutput, repromptSpeech); 
                    }
                }else{
                    this.response.shouldEndSession(false);
                    this.emit(':delegate', this.event.request.intent);
                }
            });
        }   
    },
    'AMAZON.HelpIntent': function () {
        console.log(projectName+" TRAVELMODE - Intent : HelpIntent");
		
        this.response.speak(HELP_SPEAK).listen(HELP_REPROMPT);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        console.log(projectName+" TRAVELMODE - Intent : CancelIntent");
		
        this.response.speak(CANCEL_SPEAK);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        console.log(projectName+" TRAVELMODE - Intent : StopIntent");
		
        this.response.speak(STOP_SPEAK);
        this.emit(':responseReady');
    }, 
    'SessionEndedRequest': function () {
        console.log(projectName+" TRAVELMODE - Intent : SessionEndedRequest");
        console.log(`Session ended: ${this.event.request.reason}`);
		
		this.response.speak("");
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        console.log(projectName+" TRAVELMODE - Intent : Unhandled");
		
        this.response.speak(UNHANDLED_SPEAK).listen(UNHANDLED_REPROMPT);
        this.emit(':responseReady');
    }
});

function isSlotsFilled(slots, callback) {
    console.log('In isSlotsFilled');
    var from_location = (slots.fromLocation.value ? slots.fromLocation.value : null);
    var to_location = (slots.toLocation.value ? slots.toLocation.value.toLowerCase() : null);

    if(!from_location){
        callback(':elicitSlot', 'fromLocation', SOURCE_MSG, SOURCE_MSG);
    }
    if(!to_location){
        callback(':elicitSlot', 'toLocation', DEST_MSG, DEST_MSG);
    }
    callback(':delegate');
}

function getTimeToDestinationFromGoogle (slots, callback) {
    console.log("In getTimeToDestinationFromGoogle");

    var from_location = (slots.fromLocation.value ? slots.fromLocation.value : null);
    var to_location = (slots.toLocation.value ? slots.toLocation.value.toLowerCase() : null);
    
    from_location = from_location.replace(/\s/g, "+");
    to_location = to_location.replace(/\s/g, "+");
    const departure_time = 'now';
    const key = 'YOUR_GOOGLE_DIRECTIONS_API_KEY'; // Like 'AIzaSyXXXYDD_EV7yXXXXWFFJoLp3DxsXXGXlXX'
    var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+from_location+'&destination='+to_location+'&departure_time='+departure_time+'&traffic_model=best_guess&key='+key;
    console.log("from_location:",from_location,"; to_location:",to_location,"; url: ",url);

    request.get(
        url,
        function (error, response, body) {
            console.log("error:",error);
            if (!error && response.statusCode == 200) {
                var message = `Sorry, Currently the Servers are overloaded with traffic queries. Please try after sometimes.`;
                if (JSON.parse(body) !== null) {
                    var json_body = JSON.parse(body);
                    if(json_body.status == 'ZERO_RESULTS'){
                        message = "We could not find any route between given locations. Try again by adding area and city along with locations provided";
                    } else if (json_body.status == 'NOT_FOUND'){
                        message = "We could not locate one the of the mentioned location. Try again by adding area and city along with locations provided";
                    } else if (json_body.status == 'OK'){
                        var distance = json_body.routes[0].legs[0].distance.text;
                        var time = json_body.routes[0].legs[0].duration.text;
                        var time_value = json_body.routes[0].legs[0].duration.value;
                        var timeInTraffic = time;
                        var timeInTraffic_value = time_value;
                        if(json_body.routes[0].legs[0].duration_in_traffic){
                            timeInTraffic = json_body.routes[0].legs[0].duration_in_traffic.text;
                            timeInTraffic_value = json_body.routes[0].legs[0].duration_in_traffic.value;
                        }
                        var via = json_body.routes[0].summary;
                        console.log(distance+"--"+time+"--"+timeInTraffic);
                        if(timeInTraffic_value > time_value){
                            message = 'Fastest route, despite heavy traffic than usual between '+slots.fromLocation.value+'  and '+slots.toLocation.value
                                +' via '+via+ ' which is '+ distance +'. But due to traffic you will reach in '+timeInTraffic;
                        }else{
                            message = 'Best route, despite the usual traffic between '+slots.fromLocation.value+'  and '+slots.toLocation.value+' via '+via
                                + ' which is '+ distance +'. You will reach in '+timeInTraffic;
                        }
                    } else{
                        message = "Sorry, Something went wrong. Please try again"
                    }    
                }
                console.log("message:",message);
                callback(message); 
            }else{
                callback(`Sorry, Currently the Servers are overloaded with traffic queries. Please try after sometimes.`);
            }
        }
    );
}

function getPartOfDay() {
    let partOfDay;
    let IST = new Date();
    IST.setHours(IST.getHours() + 5);
    IST.setMinutes(IST.getMinutes() + 30);
    if(IST.getHours() > 9 && IST.getHours() <12) {
        partOfDay = "Good Morning";
    }else if(IST.getHours() >= 12 && IST.getHours() < 16){
        partOfDay = "Good Afternoon";
    }else {
        partOfDay = "Good Evening";
    }
    return partOfDay;
}