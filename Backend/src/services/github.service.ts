import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const getRepository = async (
  owner: string,
  repo: string
) => {
  const response = await octokit.repos.get({
    owner,
    repo,
  });

  return response.data;
};

export const getRepositoryIssues = async (
  owner: string,
  repo: string
) => {
  const response = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "open",
  });

  return response.data;
};