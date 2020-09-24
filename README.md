![DDLAB](./images/A22.png)
# How to check latency after pinging an IP Address

This is an example project which performs the followings

* Check latency in pinging the IP address

# How to run and test

Use the following command to run.

`yarn install && yarn build && yarn start`

# Concept
Functionally the average round trip time is the latest of IP address.
Check below the basic output after pinging an IP address

```
ping 10.60.144.181

Pinging 10.60.144.181 with 32 bytes of data:
Reply from 10.60.144.181: bytes=32 time=448ms TTL=51
Reply from 10.60.144.181: bytes=32 time=434ms TTL=51
Reply from 10.60.144.181: bytes=32 time=422ms TTL=51
Reply from 10.60.144.181: bytes=32 time=440ms TTL=51

Ping statistics for 10.60.144.181:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 422ms, Maximum = 448ms, Average = 436ms
```

In the above case **Average = 436ms** is the latency value

# Technicalities
* Refer to the class `ping.latency.service`. Exported class name is `PingLatencyService`

An example is given below.

```
const latencyService = new PingLatencyService();
const latency = await latencyService.getLatency(hostIp);
```
In the above case, if the latency value is -1, it means, IP address is not pingable.
If IP address is pingable, latency will return some value in number format


Contributor
==========
@Author : **Debadatta Mishra (PIKU)** [Know me](https://about.me/debadattamishra)

Conclusion
==========
Learn, explore more and share with all.

![DDLAB](./images/dd-logo.png)
