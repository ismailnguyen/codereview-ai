const axios = require('axios');
const FormData = require('form-data');

class Bitbucket {
    constructor({
        clientId,
        clientSecret,
        workspace,
        repository
    }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.workspace = workspace;
        this.repository = repository;
    }

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
