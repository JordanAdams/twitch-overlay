import "babel-polyfill";
import "@fortawesome/fontawesome-free/css/all.css";
import "./scss/gameplay.scss";

interface OverlayStatsResponse {
  followers: {
    latest: string | null
  }
}

const latestFollowerElement = document.querySelector('#latest-follower');

const getLatestFollower = async (): Promise<string | null> => {
  const resp = await fetch('https://europe-west2-jordanadams.cloudfunctions.net/get-twitch-overlay-stats')
  const body: OverlayStatsResponse = await resp.json();
  return body.followers.latest
}

const updateLatestFollower = async (): Promise<void> => {
  try {
    const follower = await getLatestFollower()
    if (latestFollowerElement && follower) {
      latestFollowerElement.innerHTML = follower;
    }
  } catch(error) {
    console.error(error)
  }
}

const update = (): void => {
  updateLatestFollower();

  setTimeout(update, 3000);
}

(async () => {
  update();
})().catch(console.error);
