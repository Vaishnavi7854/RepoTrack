const fs = require("fs").promises;
const path = require("path");

async function pullRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // Assuming the local storage directory is "local_storage/commits"
    const localStoragePath = path.resolve("local_storage", "commits");

    const commitDirs = await fs.readdir(localStoragePath);

    for (const commitDir of commitDirs) {
      const commitPath = path.join(localStoragePath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const srcFilePath = path.join(commitPath, file);
        const destFilePath = path.join(commitsPath, commitDir, file);

        // Ensure the destination directory exists
        await fs.mkdir(path.dirname(destFilePath), { recursive: true });

        // Read the file from local storage and write it to the destination path
        const fileContent = await fs.readFile(srcFilePath);
        await fs.writeFile(destFilePath, fileContent);
      }
    }

    console.log("All commits pulled from local storage.");
  } catch (err) {
    console.error("Unable to pull: ", err);
  }
}

module.exports = { pullRepo };
