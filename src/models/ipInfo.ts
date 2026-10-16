export interface LocationData {
  country: string;
  region: string;
  city: string;
  postalCode: string;
  timezone: string;
}

export interface IpInfoData {
  ip: string;
  location: LocationData;
  isp: string;
}

export class IpInfo implements IpInfoData {
  ip: string;
  location: LocationData;
  isp: string;

  constructor(data: IpInfoData) {
    this.ip = data.ip;
    this.location = data.location;
    this.isp = data.isp;
  }
}