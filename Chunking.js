async function runWithLimit(tasks, limit = 10) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++;
      const task = tasks[currentIndex];

      try {
        const result = await task();
        results[currentIndex] = result;
        console.log(` Done task ${currentIndex}`);
      } catch (err) {
        console.log(` Failed task ${currentIndex}`);
      }
    }
  }

  // create workers
  const workers = Array.from({ length: limit }, () => worker());

  await Promise.all(workers);

  return results;
}


const tasks = Array.from({ length: 10 }, (_, i) => {
  return async () => {
    console.log(`⏳ Start task ${i}`);

    // simulate delay (2 seconds)
    await new Promise(res => setTimeout(res, 2000));

    console.log(` End task ${i}`);
    return i;
  };
});

(async () => {
  const start = Date.now();

  const results = await runWithLimit(tasks, 5);

  const end = Date.now();

  console.log("\nResults:", results);
  console.log("Total time:", end - start, "ms");
})();

