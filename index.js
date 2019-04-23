var request = require('request-promise-native');

// Disable SSL for simplicity and enable the cookie jar for REST API session ID
request = request.defaults({strictSSL: false, jar: true});

let host = "https://10.160.105.69";
let username = 'administrator@vsphere.local';
let password = 'Admin!23';

// Generic HTTP GET
async function get(path) {
  let result = await request({ url: `${host}/${path}` });
  return JSON.parse(result);
}

// Login using Basic Auth
async function login() {
  await request({
    url : `${host}/rest/com/vmware/cis/session`,
    method: 'POST',
    headers : { "Authorization" : "Basic " + new Buffer(`${username}:${password}`).toString("base64") }
  });
}

function log(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

// Make a few API calls
async function callApi() {

  // Fetch a list of VMs
  let vms = await get('rest/vcenter/vm');
  log(vms);

  let vm = null;

  // Fetch details of the first vm in the list
  if(vms.value.length > 0) {
    vm = await get(`rest/vcenter/vm/${vms.value[0].vm}`);
    console.log(`\nDetails of VM: ${vms.value[0].vm}`);
    log(vm);
  }
  let consolecli = await get('rest/appliance/access/consolecli');
  console.log(consolecli.value); // <- .enabled   

  let power = await get(`rest/vcenter/vm/${vms.value[0].vm}/power`);
  console.log(power.value.state)

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
