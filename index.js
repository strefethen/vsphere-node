var request = require('request-promise-native');

// Disable SSL for simplicity and enable the cookie jar for REST API session ID
request = request.defaults({strictSSL: false, jar: true});

let host = "https://sc2-rdops-vm06-dhcp-195-173";
let username = 'administrator@vsphere.local';
let password = 'Admin!23';

// Generic HTTP GET
async function get(url) {
  return await request({ url: url });
}

// Login using Basic Auth
async function login() {
  await request({
    url : `${host}/rest/com/vmware/cis/session`,
    method: 'POST',
    headers : { "Authorization" : "Basic " + new Buffer(`${username}:${password}`).toString("base64") }
  });
}

// Make a few API calls
async function callApi() {

  // Fetch a list of VMs
  let vms = JSON.parse(await get(`${host}/rest/vcenter/vm`));
  console.log(JSON.stringify(vms, null, 2));

  // Fetch details of the first vm in the list
  if(vms.value.length > 0) {
    let vm = JSON.parse(await get(`${host}/rest/vcenter/vm/${vms.value[0].vm}`));
    console.log(`\nDetails of VM: ${vms.value[0].vm}`);
    console.log(JSON.stringify(vm, null, 2));
  }
}

login().then(() => {
  callApi();
}, (error) => {
  if(error.response) {
    console.log(error.response.statusMessage);
  } else {
    console.log(error.message);
  }
});
