import * as ip from "ip";
import ipRangeCheck from "ip-range-check";
import { Netmask } from "netmask";
import os from 'os';
import { IPUtility } from "./ip-utility";
import { LocalIPSubnetUtility } from './local-ip-subnet.utility';

export class Test {

    public check5(): void {
        const localIpSubnet: LocalIPSubnetUtility = new LocalIPSubnetUtility();
        const ipSubnetMap: Map<string, string> = localIpSubnet.getLocalIPSubnetMap();
        for (const [ip1, subnet] of ipSubnetMap.entries()) {
            console.log(ip1, "<==========>", subnet);
        }
    }

    public check4(): void {
        const nets = os.networkInterfaces();
        // console.log("Nets: ", nets);
        // console.log( typeof(nets));
        for (const name of Object.keys(nets)) {
            const someName = nets[name];
            if (someName !== undefined) {
                // console.log("Some Name: ", someName);
                for (const net of someName) {
                    // console.log("Net : ", net);
                    if (net.family === 'IPv4' && net.internal === false) {
                        const ipAdress = net.address;
                        const subnet = net.netmask;
                        console.log("Local IP Address : ", ipAdress);
                        console.log("Local Subnet : ", subnet);
                    }
                }
            }
        }
    }

    public check3(): void {
        const ifaces = require('os').networkInterfaces();
        let address;

        Object.keys(ifaces).forEach(dev => {
            ifaces[dev].filter((details: any) => {
                if (details.family === 'IPv4' && details.internal === false) {
                    address = details.address;
                }
            });
        });
        console.log("Local IP Address: ", address);
    }

    public check2(): void {
        const nets = os.networkInterfaces();
        // console.log(nets);
        const results = Object.create(null);

        for (const name of Object.keys(nets)) {
            const someName = nets[name];
            if (someName !== undefined) {
                for (const net of someName) {
                    // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
                    if (net.family === 'IPv4' && !net.internal) {
                        if (!results[name]) {
                            results[name] = [];
                        }

                        results[name].push(net.address);
                    }
                }
            }

        }
        console.log(results);
    }

    public check1(): void {
        // const block = new Netmask('10.0.0.0/12');
        const block = new Netmask("255.255.255.0/24");
        console.log(block);
    }

    public check(): void {
        let flag = ipRangeCheck("192.168.1.1", "102.1.5.2/24");
        flag = ipRangeCheck("192.168.1.1", "192.168.1.0/24")
        flag = ipRangeCheck("10.185.158.205", "255.255.255.0/24")
        console.log("Flag: ", flag);
    }

    // public async validateSubnet(): Promise<void> {
    //     const subnet = "255.255.255.0/24";
    //     const wifiIP = "192.168.0.109";
    //     const isInRange: boolean = new IPUtility().getRangeOfIPAddress();
    //     console.log("Internal Check Value: ", isInRange);
    //     const check = ip.cidrSubnet(subnet).contains(wifiIP);
    //     console.log("External Check Value: ", check);
    // }

    public async validateSubnet(): Promise<void> {
        const subnet = "255.255.255.0/24";
        const wifiIP = "192.168.0.109";
        const isInRange: boolean = new IPUtility().isIPInSubnetRange(wifiIP, subnet);
        console.log("Internal Check Value: ", isInRange);
        const check = ip.cidrSubnet(subnet).contains(wifiIP);
        console.log("External Check Value: ", check);
    }

    public async check11(): Promise<void> {
        // const subnet = "10.185.144.1";// "255.255.240.0";
        const subnet = "255.255.240.0";
        const myIP: string = ip.address();
        const isInRange: boolean = new IPUtility().isIPInSubnetRange(myIP, subnet);
        const someValue = ip.subnet(myIP, '255.255.240.0');
        // const someValue = ip.subnet('1.2.3.4', '255.255.240.0');
        console.log("==============================================");
        console.log("My IP Address: ", myIP);
        console.log("Some Value: ", someValue);
        console.log("Is IP address in subnet range ?", isInRange);
        console.log("==============================================");

        const check = ip.cidrSubnet("255.255.240.0/32").contains(myIP);
        console.log("Check Value: ", check);
    }

}

const test = new Test();
// test.check1();
test.check5();
