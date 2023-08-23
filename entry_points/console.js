require('dotenv').config();

const OpenAISuggestions = require('../data_providers/openai').OpenAISuggestions;
const Bitbucket = require('../data_providers/bitbucket').Bitbucket;
const CodeReviewer = require('../core/codereviewer').CodeReviewer;

const main = async () => {
    // read branch name from user's input
    const branchName = process.argv[2];
    if (!branchName) {
        console.error('Please provide a branch name.');
        process.exit(1);
    }

    const aiModel = new OpenAISuggestions(process.env.OPENAI_API_KEY);

    const codeRepository = new Bitbucket({
        clientId: process.env.BITBUCKET_API_CLIENT_ID,
        clientSecret: process.env.BITBUCKET_API_CLIENT_SECRET,
        workspace: process.env.BITBUCKET_WORKSPACE,
        repository: process.env.BITBUCKET_REPOSITORY
    });

    const codereviewer = new CodeReviewer(aiModel, codeRepository);

    const reviewResults = await codereviewer.review(branchName);

    console.log(reviewResults);
}

main();
