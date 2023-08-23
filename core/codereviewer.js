class CodeReviewer {
    constructor(aiModel, codeRepository) {
        this.aiModel = aiModel;
        this.codeRepository = codeRepository;
    }

    async review (branchName) {
        const task = 'Review the given javascript code extracted with git diff for a potential readability, security or testability issue';

        const codeDiff = await this.codeRepository.codeDiff(branchName);
        return await this.aiModel.suggest(task, codeDiff);
    }
}

module.exports = {
    CodeReviewer: CodeReviewer
}
