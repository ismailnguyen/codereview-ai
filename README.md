# codereview-ai
Review Bitbucket branch using Open AI

## Pre-requisites
- Have an OpenAI API key ([How to get an OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key))
- Have Bitbucket API credentials (client id/secret) ([How to get an Bitbucket API credentials](https://support.atlassian.com/bitbucket-cloud/docs/repository-access-tokens/))

## Setup
- Create a `.env` file in the root (or rename the existing `.env.example` by removing the `.example` part)
- Add or edit the `.env` file configurations

### Example of `.env` file
```md
BITBUCKET_API_CLIENT_ID=<PUT HERE YOUR BITBUCKET API CLIENT ID>
BITBUCKET_API_CLIENT_SECRET=<PUT HERE YOUR BITBUCKET API CLIENT SECRET>
BITBUCKET_WORKSPACE=ismailnguyen
BITBUCKET_REPOSITORY=my-super-fake-repository

OPENAI_API_KEY=<PUT HERE YOUR OPEN API KEY>

```


## Usage

Run the following command in terminal:
```bash
npm run review "<PUT HERE THE BRANCH NAME TO REVIEW>"
```

### Example
```bash
npm run review "feature/23094-my-super-dummy-feature"
```