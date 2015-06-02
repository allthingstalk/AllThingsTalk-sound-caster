var smartliving = require('smartliving');
var grove = require('jsupm_grove');

smartliving.credentials = require('./credentials');

var child = require('child_process');
var gstreamer = null;
var streamURL = 'http://revolutionradio.ru:8000/live.ogg';
var volumeLevel = 0.1;
var isPlaying = false;

// define profiles for assets
var boolProfile = {
    type: 'boolean'
};
var stringProfile = {
    type: 'string'
};

var controlProfile = {
    type: 'string',
    enum: ['stop', 'play']
};

var volumeControlProfile = {
    type: 'integer',
    minimum: 1,
    maximum: 10
};

// PIR sensor
// creating connection with PIR sensor
var d2 = new grove.GroveButton(2);
// creating smartliving PIR asset object
var pir = smartliving.addAsset("d2", "Motion detector", "Detects motion. Damn right", boolProfile, function(){
    console.log('Motion detector enrolled');
});

// stream control asset
var controlAsset = smartliving.addAsset("101", "Control", "Used to play or stop audio stream", controlProfile, function(){ 
    console.log("Control asset enroled"); },
 function (command) {   
    if(command == "\"play\"") {
        stopStream();
        startStream();
    } else {
        // turn music stream off
        stopStream();
    }
}
);

// input stream url asset

var inputStreamUrlAsset = smartliving.addAsset("102", "Input Stream Url", "Used to define stream url", stringProfile, function() {
    console.log("Input Stream Url asset enroled"); },
    function (url) {
    if (url !== null && url !== undefined) {
        if(isPlaying){
        streamURL = url;
        stopStream();
        startStream();
        } else {
            streamURL = url;
        }
    }
}
);

var volumeControlAsset = smartliving.addAsset("103", "Volume Control", "Used to control volume of the stream", volumeControlProfile, function () {
    console.log("Volume control asset enroled"); },
    function (level) {
    if(volumeLevel !== null && volumeLevel !== undefined) {
        volumeLevel = level/10;
        stopStream();
        startStream();
    } else {
        volumeLevel = level/10;
    }
});

smartliving.connect();

//////// defining handlers

function startStream() {
        var options = null;
        var callArguments = ['souphttpsrc','location='+ streamURL, '!', 'oggdemux', '!', 'vorbisdec', '!', 'volume', 'volume='+volumeLevel, '!', 'pulsesink'];
        var cmd = 'gst-launch-1.0';
        
        console.log(streamURL.toString());
        
        gstreamer = child.spawn(cmd, callArguments, options);
        isPlaying = true;
        gstreamer.stderr.on('data', onSpawnError);
        gstreamer.on('exit', onSpawnExit);  
}

function stopStream(){
    if (gstreamer !== null) {
            gstreamer.kill();
            isPlaying = false;
        }
}

function onSpawnError(data) {
    console.log(data.toString());
}

function onSpawnExit(code) {
    if (code !== null) {
     console.log('GSTREAMER ERROR! Exit code ' + code);   
    }
}

// Interval for PIR sensor reading 
setInterval(function(){
 
    var reading = d2.value();
	
 if(reading === 1) {
     // motion detected
     smartliving.send(true, "d2");
 } else {
     // no motion in vicinity
     smartliving.send(false, "d2");
 }

},3000);