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

export const getTrendingRepositories =
  async () => {
    const response =
      await octokit.request(
        "GET /search/repositories",
        {
          q: "stars:>10000",
          sort: "stars",
          order: "desc",
          per_page: 12,
        }
      );

    return response.data.items.map(
      (repo: any) => ({
        id: repo.id,
        name: repo.full_name,
        description:
          repo.description,
        stars:
          repo.stargazers_count,
        forks: repo.forks_count,
        language:
          repo.language,
        url: repo.html_url,
      })
    );
  };

export const getTrendingIssues =
  async () => {
    const response =
      await octokit.request(
        "GET /search/issues",
        {
          q: "is:issue is:open comments:>5",
          sort: "comments",
          order: "desc",
          per_page: 20,
        }
      );

    return response.data.items.map(
      (issue: any) => ({
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        comments:
          issue.comments,
        repository:
          issue.repository_url
            .split("/")
            .slice(-2)
            .join("/"),
        labels:
          issue.labels?.map(
            (label: any) =>
              label.name
          ) || [],
      })
    );
  };

/*
|--------------------------------------------------------------------------
| Good First Issues
|--------------------------------------------------------------------------
*/

export const getGoodFirstIssues =
  async () => {
    const response =
      await octokit.request(
        "GET /search/issues",
        {
          q: 'is:issue is:open label:"good first issue"',
          sort: "comments",
          order: "desc",
          per_page: 20,
        }
      );

    return response.data.items.map(
      (issue: any) => ({
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        comments:
          issue.comments,
        repository:
          issue.repository_url
            .split("/")
            .slice(-2)
            .join("/"),
        labels:
          issue.labels?.map(
            (label: any) =>
              label.name
          ) || [],
      })
    );
  };

/*
|--------------------------------------------------------------------------
| Search Issues
|--------------------------------------------------------------------------
*/

export const searchIssues = async (
  query: string
) => {
  const response =
    await octokit.request(
      "GET /search/issues",
      {
        q: `is:issue is:open ${query}`,
        sort: "comments",
        order: "desc",
        per_page: 20,
      }
    );

  return response.data.items.map(
    (issue: any) => ({
      id: issue.id,
      title: issue.title,
      url: issue.html_url,
      comments:
        issue.comments,
      repository:
        issue.repository_url
          .split("/")
          .slice(-2)
          .join("/"),
      labels:
        issue.labels?.map(
          (label: any) =>
            label.name
        ) || [],
    })
  );
};