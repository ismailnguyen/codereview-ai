const OpenAISuggestions = require('../../../data_providers/openai').OpenAISuggestions;
const Bitbucket = require('../../../data_providers/bitbucket').Bitbucket;
const CodeReviewer = require('../../../core/codereviewer').CodeReviewer;

/* The `exports.handler` function is the entry point for the Netlify function. When the 
function is triggered, this function will be executed. */
exports.handler = async function (event, context) {
    // Parse the body of the event to retrieve the parameters that were passed to the function.
    const {
        openai_api_key,
        bitbucket_api_client_id,
        bitbucket_api_client_secret,
        bitbucket_workspace,
        bitbucket_repository,
        bitbucket_branch
    } = JSON.parse(event.body);

    // Instantiate the OpenAI Suggestion model.
     const aiModel = new OpenAISuggestions(openai_api_key);

     // Instantiate the Bitbucket code repository.
     const codeRepository = new Bitbucket({
         clientId: bitbucket_api_client_id,
         clientSecret: bitbucket_api_client_secret,
         workspace: bitbucket_workspace,
         repository: bitbucket_repository
     });

     // Instantiate the code reviewer.
     const codereviewer = new CodeReviewer(aiModel, codeRepository);

     // Run the code review.
     const reviewResults = await codereviewer.review(bitbucket_branch);

     // Return the results of the code review.
     return {
      statusCode: 200,
      body: reviewResults,
    };
};
