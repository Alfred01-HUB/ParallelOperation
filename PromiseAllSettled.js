//2. Promise.allSettled() → Partial success system
//Scenario: Load optional widgets (weather, news, ads)

// widgets.js

function fetchWeather() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Weather: Sunny 28°C");
    }, 1000);
  });
}

function fetchNews() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("News API failed");
    }, 1500);
  });
}

function fetchAds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Ads: Buy 1 Get 1 Free!");
    }, 500);
  });
}

async function loadWidgets() {
  console.log("Loading widgets...\n");

  const results = await Promise.allSettled([
    fetchWeather(),
    fetchNews(),
    fetchAds()
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(` Widget ${index + 1} loaded:`, result.value);
    } else {
      console.log(`Widget ${index + 1} failed:`, result.reason);
    }
  });

  console.log("\nDone.");
}

loadWidgets();