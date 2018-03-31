var request = require('request-promise-native');
request = request.defaults({strictSSL: false, jar: true});

let host = "https://sc2-rdops-vm06-dhcp-195-173";
let username = 'administrator@vsphere.local';
let password = 'Admin!23';

async function get(url) {
  return await request({ url: url });
}

async function login() {
  await request({
    url : `${host}/rest/com/vmware/cis/session`,
    method: 'POST',
    headers : { "Authorization" : "Basic " + new Buffer(`${username}:${password}`).toString("base64") }
  });
}

async function callApi() {
  // Fetch a list of VMs
  let vms = JSON.parse(await get(`${host}/rest/vcenter/vm`));
  console.log(JSON.stringify(vms));
  // Fetch details for the first vm
  if(vms.value.length > 0) {
    let vm = await get(`${host}/rest/vcenter/vm/${vms.value[0].vm}`);
    console.log(vm);
  }
}

login().then(() => {
  callApi();
}, (error) => {
  console.log(error);
});
