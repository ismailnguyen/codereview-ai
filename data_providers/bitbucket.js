/* The Bitbucket class is a JavaScript class that provides methods for obtaining an access token and
retrieving code diffs from a Bitbucket repository. */
const axios = require('axios');
const FormData = require('form-data');

class Bitbucket {
    constructor({
        clientId,
        clientSecret,
        workspace,
        repository
    }) {
        /* The line `this.clientId = clientId;` is assigning the value of the `clientId` parameter to
        the `clientId` property of the Bitbucket class. This allows the class to store and access
        the client ID for authentication purposes. */
        this.clientId = clientId;
        /* The line `this.clientSecret = clientSecret;` is assigning the value of the `clientSecret`
        parameter to the `clientSecret` property of the Bitbucket class. This allows the class to
        store and access the client secret for authentication purposes. */
        this.clientSecret = clientSecret;
        /* The line `this.workspace = workspace;` is assigning the value of the `workspace` parameter
        to the `workspace` property of the Bitbucket class. This allows the class to store and
        access the workspace name for retrieving code diffs from the Bitbucket repository. */
        this.workspace = workspace;
        /* The line `this.repository = repository;` is assigning the value of the `repository`
        parameter to the `repository` property of the Bitbucket class. This allows the class to
        store and access the name of the repository for retrieving code diffs from the Bitbucket
        repository. */
        this.repository = repository;
    }

    /**
     * The function `accessToken` is an asynchronous function that retrieves an access token using
     * client credentials authentication.
     * @returns The access token is being returned.
     */
    async accessToken () {
        let grantType = new FormData();
        grantType.append('grant_type', 'client_credentials');

        const { data } = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://bitbucket.org/site/oauth2/access_token',
            headers: { 
                ...grantType.getHeaders()
            },
            auth: {
                username: this.clientId,
                password: this.clientSecret
            },
            data : grantType
        });

        return data.access_token;
    }

    /**
     * The function `codeDiff` retrieves the diff of a specific branch in a Bitbucket repository using
     * the Bitbucket API.
     * @param branchName - The `branchName` parameter is the name of the branch in the repository for
     * which you want to retrieve the diff.
     * @returns The `data` object is being returned.
     */
    async codeDiff (branchName) {
        const accessToken = await this.accessToken();
        const { data } = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.bitbucket.org/2.0/repositories/${ this.workspace }/${ this.repository }/diff/${ branchName }?topic=false`,
            headers: { 
                'Authorization': `Bearer ${ accessToken }`
            }
        });
    
        return data;
    }
}

module.exports = {
    Bitbucket: Bitbucket
}
