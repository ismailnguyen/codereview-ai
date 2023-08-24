const OpenAISuggestions = require('../../../data_providers/openai').OpenAISuggestions;
const Bitbucket = require('../../../data_providers/bitbucket').Bitbucket;
const CodeReviewer = require('../../../core/codereviewer').CodeReviewer;

/* The `exports.handler` function is the entry point for the Netlify function. When the 
function is triggered, this function will be executed. */
exports.handler = async function (event, context) {
    const {
        openai_api_key,
        bitbucket_api_client_id,
        bitbucket_api_client_secret,
        bitbucket_workspace,
        bitbucket_repository,
        bitbucket_branch
    } = JSON.parse(event.body);

     const aiModel = new OpenAISuggestions(openai_api_key);
 
     const codeRepository = new Bitbucket({
         clientId: bitbucket_api_client_id,
         clientSecret: bitbucket_api_client_secret,
         workspace: bitbucket_workspace,
         repository: bitbucket_repository
     });
 
     const codereviewer = new CodeReviewer(aiModel, codeRepository);
 
     const reviewResults = await codereviewer.review(bitbucket_branch);
 
     return {
      statusCode: 200,
      body: reviewResults,
    };
};
