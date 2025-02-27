const fs = require("fs").promises;
const path = require("path");

async function pushRepo() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDirs = await fs.readdir(commitsPath);
    for (const commitDir of commitDirs) {
      const commitPath = path.join(commitsPath, commitDir);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const destPath = path.join("local_storage", "commits", commitDir, file);
        
        // Ensure the directory exists
        await fs.mkdir(path.dirname(destPath), { recursive: true });
        
        // Write the file to the local storage
        await fs.writeFile(destPath, fileContent);
      }
    }

    console.log("All commits pushed locally.");
  } catch (err) {
    console.error("Error pushing locally: ", err);
  }
}

module.exports = { pushRepo };
