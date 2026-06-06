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

// export const getRepositoryIssues = async (
//   owner: string,
//   repo: string
// ) => {
//   const response = await octokit.issues.listForRepo({
//     owner,
//     repo,
//     state: "open",
//   });

//   return response.data;
// };


export const getReadme = async (
  owner: string,
  repo: string
) => {
  const response = await octokit.repos.getReadme({
    owner,
    repo,
  });

  const content = Buffer.from(
    response.data.content,
    "base64"
  ).toString("utf-8");

  return content;
};


export const getRepoTree = async (
  owner: string,
  repo: string
) => {
  const branch =
    await octokit.repos.get({
      owner,
      repo,
    });

  const defaultBranch =
    branch.data.default_branch;

  const tree =
    await octokit.git.getTree({
      owner,
      repo,
      tree_sha: defaultBranch,
      recursive: "true",
    });

  return tree.data.tree;
};


export const getIssue = async (
  owner: string,
  repo: string,
  issueNumber: number
) => {
  const response =
    await octokit.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
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
    per_page: 20,
  });

  return response.data.map((issue) => ({
    number: issue.number,
    title: issue.title,
    comments: issue.comments,
    createdAt: issue.created_at,
    url: issue.html_url,
  }));
};