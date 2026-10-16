import { IpInfo } from "../models/ipInfo.js";

export async function getIpInfo(input: string): Promise<IpInfo> {
  try {
    const response = await
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_UAFQBYZUGgSsKTTEmqICIWGKZkZRL&ipAddress=${encodeURIComponent(input)}`);

    if (!response.ok) {
      throw new Error('Not working')
    }

    const data = await response.json();

    return new IpInfo(data)
  } catch (error) {
      console.error(error)
      throw error;
  }
}