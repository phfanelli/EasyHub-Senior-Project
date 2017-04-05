var gitInfo = gitInfo || {};

gitInfo.commitMessage="Records the changes made to the repository. Allows the user to provide a" +
    " message to describe the changes that were made." +
"\n\n\nThis must be done before PUSH can be used"    ;

gitInfo.pushMessage="Updates the current repository with the changes included in the last commit." +
    " Requires a commit to occur first.";

gitInfo.pullMessage="Brings down changes from currently selected repository and integrates them " +
    "with your current branch.";

gitInfo.cloneMessage="Brings down a copy of the selected repository and stores it in the specified" +
    " folder.";

gitInfo.deleteMessage="Delete your current repository from \nyour computer and EasyHub";
