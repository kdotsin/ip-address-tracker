export class IpInfo {
    ip;
    location;
    isp;
    constructor(data) {
        this.ip = data.ip;
        this.location = data.location;
        this.isp = data.isp;
    }
}
