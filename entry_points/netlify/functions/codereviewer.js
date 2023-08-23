const OpenAISuggestions = require('../../../data_providers/openai').OpenAISuggestions;
const Bitbucket = require('../../../data_providers/bitbucket').Bitbucket;
const CodeReviewer = require('../../../core/codereviewer').CodeReviewer;

exports.handler = async function (event, context) {
     const aiModel = new OpenAISuggestions(event.body.openai_api_key);
 
     const codeRepository = new Bitbucket({
         clientId: event.body.bitbucket_api_client_id,
         clientSecret: event.body.bitbucket_api_client_secret,
         workspace: event.body.bitbucket_workspace,
         repository: event.body.bitbucket_repository
     });
 
     const codereviewer = new CodeReviewer(aiModel, codeRepository);
 
     const reviewResults = await codereviewer.review(event.body.branchName);
 
     return {
      statusCode: 200,
      body: reviewResults,
    };
};
