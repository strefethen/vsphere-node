var request = require('request');

var request = request.defaults({strictSSL: false, jar: true});

let host = "https://sc2-rdops-vm06-dhcp-195-173";

let username = 'administrator@vsphere.local',
    password = 'Admin!23',
    url = `${host}/rest/com/vmware/cis/session`;

function listVms() {
  request({
    url: `${host}/rest/vcenter/vm`,
    }, function(error, response, body) {
      if(error) {
        console.log(`Error: ${error.message}`);
      } else if(response.statusCode == 200) {
        console.log(body);
      } else {
        console.log(`Error: ${response.statusMessage}`);
      }
    }
  );
}

// Basic Auth to vSphere REST Endpoint, uses cookie for authentication
request({
    url : url,
    method: 'POST',
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : "Basic " + new Buffer(`${username}:${password}`).toString("base64")
    }
  }, function (error, response, body) {
    if(error) {
      console.log(`Error: ${error.message}`);
    } else if(response.statusCode == 200) {
      listVms();
    } else {
      console.log(`Error: ${response.statusMessage}`);
    }
  }
);
