const OpenAI = require('openai');

class OpenAISuggestions {
    constructor(apiKey, gptModel = 'gpt-3.5-turbo-0613') {
        this.openai = new OpenAI({
            apiKey: apiKey
        });

        this.gptModel = gptModel;
    }

    async suggest (systemTask, userTask) {
        const aiResponse = await this.openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemTask
                },
                {
                    role: 'user',
                    content: userTask
                }
            ],
            model: this.gptModel || DEFAULT_GPT_MODEL
        });
    
        return aiResponse.choices[0].message.content;
    }
}

module.exports = {
    OpenAISuggestions: OpenAISuggestions
}
