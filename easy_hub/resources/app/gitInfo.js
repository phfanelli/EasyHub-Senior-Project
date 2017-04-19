var gitInfo = gitInfo || {};

gitInfo.commitMessage="Records the changes made on the current branch to the repository. Allows the user to provide a" +
    " message to describe the changes that were made and automatically adds all new files." +
"\n\n\nThis must be done before PUSH can be used"    ;

gitInfo.pushMessage="Updates the current remote branch with the changes included in the current outstanding commits" +
    " Requires a commit to have occured first.";

gitInfo.pullMessage="Brings down changes from currently selected remote branch and integrates them " +
    "with your current local branch";

gitInfo.cloneMessage="Brings down a copy of the selected repository and stores it in the specified" +
    " folder.";

gitInfo.deleteMessage="Delete your current repository from \nyour computer and EasyHub";

gitInfo.resetMessage="Resets the local repository to remote status.\n\n\nClean is called inside of this to clean up any local changes not being tracked";

gitInfo.localBranchMessage="Creates a branch that has not yet been pushed up to remote repository.";

