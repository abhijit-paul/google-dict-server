const http = require('http');
const https = require('https');
const url = require('url');

const headers = {
    'accept-language': 'en-US,en;q=0.9,bn;q=0.8',
    'accept-encoding': 'gzip, deflate, br',
    'authority': 'www.google.co.in',
};

const options = function(searchKey) {
    return {
        url: 'https://www.google.co.in/async/dictw?oq='+searchKey+'&gs_l=dictionary-widget&async=term:'+searchKey+',corpus:en,hwdgt:true,wfp:true,xpnd:true,ttl:,tsl:en,ftclps:false,_id:dictionary-modules,_pms:s,_fmt:pc',
        headers: headers,
        gzip: true,
    };
};


http.createServer(function (req, thisServerResponse) {
    thisServerResponse.writeHead(200, {'Content-Type': 'text/html'});
    const searchKey = url.parse(req.url, true).query.q;
    console.log(searchKey);
    const dictUrl = 'https://www.google.co.in/async/dictw?oq='+searchKey+'&gs_l=dictionary-widget&async=term:'+searchKey+',corpus:en,hwdgt:true,wfp:true,xpnd:true,ttl:,tsl:en,ftclps:false,_id:dictionary-modules,_pms:s,_fmt:pc';
    https.get(dictUrl, function(res){
        let body = "";
        res.on("data", function(data) {
            body += data;
        });
        res.on("end", function() {
            body += '<script>function onKeyUp(event, data){if (event.keyCode === 13) {window.location.search="?q="+data;}}</script>';
            body = body.replace('<input ', '<input onkeyup="onKeyUp(event, this.value)" ');
            console.log(body);
            thisServerResponse.end(body);
        });
    });
}).listen(8080);
