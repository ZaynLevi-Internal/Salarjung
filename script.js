const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const exhibitText = document.getElementById("exhibit");

let currentAudio = null;
let lastPlayed = "";

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

startBtn.addEventListener("click", async () => {

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

    statusText.innerText =
      "Bluetooth permission denied or scan cancelled.";

  }

});