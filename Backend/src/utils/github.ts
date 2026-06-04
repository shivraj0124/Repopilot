export const extractRepoInfo = (url: string) => {
  const githubRegex =
    /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/?$/;

  const parts = url.match(githubRegex);

  if (!parts) {
    throw new Error("Invalid GitHub repository URL");
  }

  const owner = parts[1];
  const repo = parts[2];

  if (!owner || !repo) {
    throw new Error("Invalid GitHub repository URL");
  }

  return {
    owner,
    repo,
  };
};