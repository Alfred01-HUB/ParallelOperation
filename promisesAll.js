const fs = require("fs").promises;

async function loadUserData() {
  const [user, posts, settings] = await Promise.all([
    fs.readFile("userdata/file1.txt", "utf8"),
    fs.readFile("userdata/file2.txt", "utf8"),
    fs.readFile("userdata/file3.txt", "utf8")
  ]);

  const result = {
    user: JSON.parse(user),
    posts: JSON.parse(posts),
    settings: JSON.parse(settings)
  };

  console.log(result);
  return result;
}

loadUserData();