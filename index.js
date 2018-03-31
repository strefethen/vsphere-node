var request = require('request');

let host = "https://sc2-rdops-vm06-dhcp-195-173";

let username = 'administrator@vsphere.local',
    password = 'Admin!23',
    url = `${host}/rest/com/vmware/cis/session`;

request.defaults({ strictSSL: false});

function listVms() {
  request({
  url: `${host}/rest/vcenter/vm`,
  strictSSL: false,
  jar: true 
  }, function(error, response, body) {
    console.log(body);
  });
}

// Basic Auth to vSphere REST Endpoint, uses cookie for authentication
request({
    url : url,
    method: 'POST',
    strictSSL: false,
    jar: true,
    headers : {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization" : "Basic " + new Buffer(`${username}:${password}`).toString("base64")
    }
  }, function (error, response, body) {
    listVms();
  }
);
