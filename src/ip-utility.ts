/**
 * Copyright 2020 Dell Inc. or its subsidiaries. All Rights Reserved
 */

import { Netmask } from "netmask";
export class IPUtility {

    private readonly MAX_NUM = 2000;

    public isIPInSubnetRange(ipAddress: string, subnetMask: string): boolean {
        const subnetMaskCIDRPrefix = this.getCidrPrefixIPAddress(subnetMask);
        console.log("Actual Subnet with CIDR Prefix: ", subnetMaskCIDRPrefix);
        const block = new Netmask(subnetMaskCIDRPrefix);
        console.log("First IP: ", block.first);
        console.log("Last IP: ", block.last);
        console.log("Total IPs: ", block.size);
        const isInRange: boolean = block.contains(ipAddress);

        return isInRange;
    }

    public getRangeOfIPAddress(initialIPAddress: string, subnetMask: string, range: number): string[] {
        if (range === this.MAX_NUM) {
            throw new RangeError("Out of range");
        }
        const rangeIPs: string[] = [];
        const subnetMaskCIDRPrefix = this.getCidrPrefixIPAddress(subnetMask);
        const block = new Netmask(subnetMaskCIDRPrefix);
        const lastIPAddress: string = block.last;
        const initialIPNumber: number = this.getIPAddress2Number(initialIPAddress);
        for (let i = 0; i < range; i++) {
            const tempValue = initialIPNumber + i;
            // Convert to IP address
            const ip: string = this.number2IPAddress(tempValue);
            if (ip === lastIPAddress) {
                rangeIPs.push(ip);
                break;
            } else {
                rangeIPs.push(ip);
            }

        }
        return rangeIPs;
    }

    public getIPAddress2Number(ipAddress: string): number {
        let result = 0;
        const parts: string[] = ipAddress.split(".");
        parts.forEach((octet) => {
            result <<= 8;
            result += parseInt(octet, 10);
        });
        return result >>> 0;
    }

    public number2IPAddress(numIP: number): string {
        return [numIP >>> 24, numIP >> 16 & 255, numIP >> 8 & 255, numIP & 255].join(".");
    }

    private getCIDRPrefix(subnetIP: string): string {
        const subnetPrefixMap = new Map();
        subnetPrefixMap.set("255.255.255.255", "32");
        subnetPrefixMap.set("255.255.255.254", "31");
        subnetPrefixMap.set("255.255.255.252", "30");
        subnetPrefixMap.set("255.255.255.248", "29");
        subnetPrefixMap.set("255.255.255.240", "28");
        subnetPrefixMap.set("255.255.255.224", "27");
        subnetPrefixMap.set("255.255.255.192", "26");
        subnetPrefixMap.set("255.255.255.128", "25");
        subnetPrefixMap.set("255.255.255.0", "24");
        subnetPrefixMap.set("255.255.254.0", "23");
        subnetPrefixMap.set("255.255.252.0", "22");
        subnetPrefixMap.set("255.255.248.0", "21");
        subnetPrefixMap.set("255.255.240.0", "32");
        subnetPrefixMap.set("255.255.224.0", "19");
        subnetPrefixMap.set("255.255.192.0", "18");
        subnetPrefixMap.set("255.255.128.0", "17");
        subnetPrefixMap.set("255.255.0.0", "16");
        subnetPrefixMap.set("255.254.0.0", "15");
        subnetPrefixMap.set("255.252.0.0", "14");
        subnetPrefixMap.set("255.248.0.0", "13");
        subnetPrefixMap.set("255.240.0.0", "12");
        subnetPrefixMap.set("255.224.0.0", "11");
        subnetPrefixMap.set("255.192.0.0", "10");
        subnetPrefixMap.set("255.128.0.0", "9");
        subnetPrefixMap.set("255.0.0.0", "8");
        subnetPrefixMap.set("254.0.0.0", "7");
        subnetPrefixMap.set("252.0.0.0", "6");
        subnetPrefixMap.set("248.0.0.0", "5");
        subnetPrefixMap.set("240.0.0.0", "4");
        subnetPrefixMap.set("224.0.0.0", "3");
        subnetPrefixMap.set("192.0.0.0", "2");
        subnetPrefixMap.set("128.0.0.0", "1");

        return subnetPrefixMap.get(subnetIP);
    }

    private getCidrPrefixIPAddress(subnetMask: string): string {
        const indexValue: number = subnetMask.indexOf("/");
        let subnetMaskCIDRPrefix = "";
        if (indexValue === -1) {
            const prefix: string = this.getCIDRPrefix(subnetMask);
            subnetMaskCIDRPrefix = subnetMask + "/" + prefix;
        } else {
            subnetMaskCIDRPrefix = subnetMask;
        }
        return subnetMaskCIDRPrefix;
    }

}
