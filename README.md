# vSphere-Node
Illustrates calling the vSphere REST API via nodejs

## Install and Run
First update the host/username/password for your VC:

    let host = "https://sc2-rdops-vm06-dhcp-195-173";
    let username = 'administrator@vsphere.local';
    let password = 'Admin!23';

Then use the following:

    $ git clone https://github.com/strefethen/vsphere-node.git
    $ npm install
    $ npm run start