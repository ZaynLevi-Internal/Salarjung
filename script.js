const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const exhibitText = document.getElementById("exhibit");

let currentAudio = null;
let lastPlayed = "";
const supportsWebBluetooth =
  typeof navigator !== "undefined" &&
  "bluetooth" in navigator &&
  typeof navigator.bluetooth.requestDevice === "function";

const exhibits = {

  "Beacon1": {
    title: "Ancient Statue",
    audio: "audio/a.mp3"
  },

  "Beacon2": {
    title: "Historic Painting",
    audio: "audio/b.mp3"
  },

  "Beacon3": {
    title: "Royal Clock",
    audio: "audio/c.mp3"
  }

};

if(!supportsWebBluetooth) {

  startBtn.disabled = true;

  statusText.innerText =
    "This browser does not support Web Bluetooth. Open this site in a supported browser.";

}

startBtn.addEventListener("click", async () => {

  if(!supportsWebBluetooth) {

    statusText.innerText =
      "Safari does not support this Bluetooth feature here. Try Chrome or Edge on a supported device.";

    return;

  }

  try {

    statusText.innerText =
      "Searching for nearby exhibits...";

    const device = await navigator.bluetooth.requestDevice({

      acceptAllDevices: true,
      optionalServices: []

    });

    const beaconName = device.name;

    statusText.innerText =
      `Detected Beacon: ${beaconName}`;

    if(exhibits[beaconName]) {

      const exhibit = exhibits[beaconName];

      exhibitText.innerText =
        exhibit.title;

      if(lastPlayed !== beaconName) {

        lastPlayed = beaconName;

        if(currentAudio) {
          currentAudio.pause();
        }

        currentAudio =
          new Audio(exhibit.audio);

        currentAudio.play();

        statusText.innerText =
          `Playing audio for ${exhibit.title}`;

      }

    } else {

      exhibitText.innerText =
        "Unknown Exhibit";

      statusText.innerText =
        "No matching exhibit found";

    }

  } catch(error) {

    console.log(error);

    if(error?.name === "NotFoundError") {

      statusText.innerText =
        "No Bluetooth device was selected.";

    } else if(error?.name === "NotAllowedError") {

      statusText.innerText =
        "Bluetooth permission was denied.";

    } else {

      statusText.innerText =
        "Bluetooth is unavailable in this browser or the scan failed.";

    }

  }

});
