import { getIpInfo } from "./api/ipLookup.js";
declare const L: typeof import("leaflet");

const ipSearch = document.querySelector<HTMLFormElement>("#ip-search")!;
const ipInput = document.querySelector<HTMLInputElement>("#ip-input")!;
const showAddress = document.querySelector("#ip-address")!;
const showLocation = document.querySelector("#ip-location")!;
const showTimezone = document.querySelector("#ip-timezone")!;
const showIsp = document.querySelector("#ip-isp")!;

ipSearch.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    if (!ipInput || !ipInput.value) {
      throw new Error("Input or value does not exist");
    }

    if (!isValidIp(ipInput.value)) {
      showAddress.textContent = "Enter a valid IP";
      showLocation.textContent = "";
      showTimezone.textContent = "";
      showIsp.textContent = "";
      return;
    }
    const ip = await getIpInfo(ipInput.value);
    showAddress.textContent = ip.ip;
    showLocation.textContent = `${ip.location.city}, ${ip.location.region} ${ip.location.postalCode}`;
    showTimezone.textContent = `UTC ${ip.location.timezone}`;
    showIsp.textContent = ip.isp;
  } catch (error) {
    throw Error("Not Found");
  }
});

function isValidIp(input: string): boolean {
  const parts = input.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
}
