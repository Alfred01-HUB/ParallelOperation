const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/users/1"
];

// SEQUENTIAL VERSION
async function fetchSequential() {
  const start = Date.now();

  const res1 = await fetch(urls[0]);
  const data1 = await res1.json();

  const res2 = await fetch(urls[1]);
  const data2 = await res2.json();

  const res3 = await fetch(urls[2]);
  const data3 = await res3.json();

  const end = Date.now();

  console.log("Sequential Time:", end - start, "ms");
  return [data1, data2, data3];
}

//  PARALLEL VERSION
async function fetchParallel() {
  const start = Date.now();

  const responses = await Promise.all(
    urls.map(url => fetch(url))
  );

  // Convert all to JSON at once
  const data = await Promise.all(
    responses.map(res => res.json())
  );

  const end = Date.now();

  console.log("Parallel Time:", end - start, "ms");

  // destructuring
  const [post1, post2, user1] = data;

  return { post1, post2, user1 };
}

// RUN BOTH
(async () => {
  console.log("Running Sequential...");
  await fetchSequential();

  console.log("\nRunning Parallel...");
  const result = await fetchParallel();

  console.log("\nSample Output:");
  console.log(result.post1.title);
})();