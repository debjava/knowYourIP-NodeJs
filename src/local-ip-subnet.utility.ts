import os from 'os';

export class LocalIPSubnetUtility {

    public getLocalIPSubnetMap(): Map<string, string> {
        const ipSubnetMap: Map<string, string> = new Map();

        const nets = os.networkInterfaces();
        for (const name of Object.keys(nets)) {
            const someName = nets[name];
            if (someName !== undefined) {
                for (const net of someName) {
                    if (net.family === 'IPv4' && net.internal === false) {
                        const ipAdress = net.address;
                        const subnet = net.netmask;
                        ipSubnetMap.set(ipAdress, subnet);
                        // console.log("Local IP Address : ", ipAdress);
                        // console.log("Local Subnet : ", subnet);
                    }
                }
            }
        }
        return ipSubnetMap;
    }
}