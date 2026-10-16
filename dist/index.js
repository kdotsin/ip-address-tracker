import { getIpInfo } from "./api/ipLookup.js";
const ipSearch = document.querySelector("#ip-search");
const ipInput = document.querySelector("#ip-input");
const showAddress = document.querySelector("#ip-address");
const showLocation = document.querySelector("#ip-location");
const showTimezone = document.querySelector("#ip-timezone");
const showIsp = document.querySelector("#ip-isp");
var map = L.map('map').setView([40.7767, -73.9713], 13);
var pin = L.marker([40.7767, -73.9713]).addTo(map);
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
        map.setView([ip.location.lat, ip.location.lng], 13);
        pin.setLatLng([ip.location.lat, ip.location.lng]);
    }
    catch (error) {
        throw Error("Not Found");
    }
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
function isValidIp(input) {
    const parts = input.split(".");
    if (parts.length !== 4)
        return false;
    return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
}
