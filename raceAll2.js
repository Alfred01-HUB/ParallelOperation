function fetchWithTimeout(url, timeout = 2000) {
  return Promise.race([
    fetch(url).then(res => res.json()),

    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    )
  ]);
}

async function run() {
  try {
    const data = await fetchWithTimeout(
      "https://jsonplaceholder.typicode.com/posts/1",
      2000
    );

    console.log(" Data received:", data.title);
  } catch (err) {
    console.log(" Error:", err.message);
  }
}

run();