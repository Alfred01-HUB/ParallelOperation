const urls = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/invalid-url", // force failure
  "https://jsonplaceholder.typicode.com/posts/1"
];

async function loadDashboard() {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url).then(res => res.json()))
  );

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Data ${index + 1}:`, result.value);
    } else {
      console.log(`Error ${index + 1}:`, result.reason.message);
    }
  });
}

loadDashboard();