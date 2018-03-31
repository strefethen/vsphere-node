var request = require('request-promise-native');

var request = request.defaults({strictSSL: false, jar: true});

let host = "https://sc2-rdops-vm06-dhcp-195-173";

let username = 'administrator@vsphere.local',
    password = 'Admin!23';

async function listVms() {
  return await request({ url: `${host}/rest/vcenter/vm` });
}

// Basic Auth to vSphere REST Endpoint, uses cookie for authentication
request({
  url : `${host}/rest/com/vmware/cis/session`,
  method: 'POST',
  headers : {
    "Authorization" : "Basic " + new Buffer(`${username}:${password}`).toString("base64")
  }
}).then((value) => {
  listVms().then((vms) => { 
    console.log(vms);
  }, (error) => {
    console.log(error);
  });
}, (error) => {
  if(error.response) {
    console.log(error.response.statusMessage);
  } else {
    console.log(error.message);
  }
});
