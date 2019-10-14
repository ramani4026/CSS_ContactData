'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var util = require('util');
var http = require('https');

exports.logExecuteData = [];

/*
function makecall(){ 
	console.log("Entered makecall");
	var request=require("request");
	request.get("https://pub.s7.exacttarget.com/rp2cnw2q5k1",function(error,response,body){
          	 if(error){
           	      console.log(error);
          	 }else{
           	      console.log(response);
        	 }
	});
	console.log("Exit makecall");
};
*/
/*
function makecall(){ 
	var request=require("request");
 	var options = {
          	method: 'POST',
          	uri: 'https://b0149385-84da-4753-ac99-63db16ccf97f.mock.pstmn.io/ccs_mock_post',
                headers: ''           
       		};
  	request(options, function(error, response, body) {
               if(error){
                  console.log(error);
             }else{
                  console.log(response);
            }
        });
};
*/
function makecall(){ 
	http.post('https://b0149385-84da-4753-ac99-63db16ccf97f.mock.pstmn.io/ccs_mock_post', function(err, response) {
	if (err) console.log(err);

	var data = '';
	response.setEncoding('utf8');
	response.on('data', function(d) {
		data += d
	});
	response.on('end', function(d) {
		res.send(data)
	});
});
};
/*function makecall(){ 
	var https = require('https');
	console.log("Entered makecall");
	const data = JSON.stringify({ "name": "" });

	const options = {
  		hostname: "pub.s7.exacttarget.com/rp2cnw2q5k1",
  		port: 443,
  		path: "/",
  		method: "POST"
  		headers: {
    		"Content-Type": "application/json",
    		"Content-Length": data.length
  		}
	};

       const req = https.request(options);
	 /* const req = https.request(options, (res) => {
		console.log("Status code :");
		//console.log("statusCode:" + ${res.statusCode});

		res.on('data', (d) => {
			process.stdout.write(d);
			console.log(d);
		});  
	});   
	
	req.write(data);
	req.end();
	console.log("Exit makecall");
}; */



function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
};

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    console.log("Req body from edit : " + req.body );
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    console.log("Req body from save : " + req.body );
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
    console.log("Req body from execute : " + req.body );
    // example on how to decode JWT
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        // verification error -> unauthorized request
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
            // decoded in arguments
            var decodedArgs = decoded.inArguments[0];
            
            logData(req);
	    console.log("Before make call : ");
            makecall();
	    console.log("After make call : ");
            res.send(200, 'Execute');
        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Publish');
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
};
