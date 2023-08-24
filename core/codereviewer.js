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
        // The task for the AI model to perform
        const task = 'Review the given javascript code extracted with git diff for a potential readability, security or testability issue';

        // Get the code diff from the code repository
        const codeDiff = await this.codeRepository.codeDiff(branchName);

        // Return the result of the AI model
        return await this.aiModel.suggest(task, codeDiff);
    }
}

module.exports = {
    CodeReviewer: CodeReviewer
}
