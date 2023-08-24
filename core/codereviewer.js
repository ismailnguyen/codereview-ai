/* The CodeReviewer class uses an AI model and a code repository to review JavaScript code for
potential issues. */
class CodeReviewer {
    constructor(aiModel, codeRepository) {
        this.aiModel = aiModel;
        this.codeRepository = codeRepository;
    }

    /**
     * This function reviews a given JavaScript code for potential readability, security, or
     * testability issues using a code diff extracted with git.
     * @param branchName - The `branchName` parameter is the name of the branch in the code repository
     * that you want to review.
     * @returns the result of the `this.aiModel.suggest(task, codeDiff)` function call.
     */
    async review (branchName) {
        const task = 'Review the given javascript code extracted with git diff for a potential readability, security or testability issue';

        const codeDiff = await this.codeRepository.codeDiff(branchName);
        return await this.aiModel.suggest(task, codeDiff);
    }
}

module.exports = {
    CodeReviewer: CodeReviewer
}
