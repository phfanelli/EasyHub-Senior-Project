/**
 * Created by Benjamin on 3/24/2017.
 */
var gitUtils = gitUtils || {};


/**
 * REFERENCE
 * https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
 */


/**
 * attempts to clone a remote git repository
 * @param remote - address of remote repository
 * @param dest - path to new repository on local filesystem
 */
gitUtils.clone = function(remote, dest, osShell) {
    var baseCmd = 'git clone ' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

/**
 * attempts to initialize a git repository
 * @param dest - path to new repository on local filesystem
 */
gitUtils.init = function(remote, dest, osShell) {
    var baseCmd = 'git init';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.getLocalBranches = function(remote, dest, osShell) {
    var baseCmd = 'git branch' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

//    return String(execute_sync('git branch', {cwd: dest})).split("\n");
};

gitUtils.getRemoteBranches = function(remote, dest, osShell) {
    var baseCmd = 'git branch -r' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

    //  return String(execute_sync('git branch -r', {cwd: dest})).split("\n");
};

gitUtils.getAllBranches = function(remote, dest, osShell) {
    var baseCmd = 'git branch -a' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

    //return String(execute_sync('git branch -a', {cwd: dest})).split("\n");

};

gitUtils.commit = function (remote, dest, osShell) {
    var baseCmd = 'git commit -a' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.config = function (remote, dest, osShell) {
    //git config --global user.name "Sam Smith"
    //git config --global user.email
    var baseCmd = 'git config ?' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

};

gitUtils.add = function (remote, dest, osShell) {
    //need filename
    var baseCmd = 'git add "filename"' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

};

gitUtils.push = function (remote, dest, osShell) {
    //need origin, need master
    var baseCmd = 'git push origin master' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});};

gitUtils.getStatus = function (remote, dest, osShell) {
    var baseCmd = 'git status' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});};

gitUtils.remote = function (remote, dest, osShell) {
    // need origin and <server>
    var baseCmd = 'git remote add origin <server>' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.checkoutNewBranch = function (remote, dest, osShell) {
    // git checkout -b <branchname> new branch and switcvh to.
    //git checkout <branchname>
    //var baseCmd = 'git add "filename"' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.switchBranch = function (remote, dest, osShell) {
    //var baseCmd = 'git checkout <branchname>' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.pull = function (remote, dest, osShell) {
    var baseCmd = 'git pull' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.diff = function (remote, dest, osShell) {
    //git diff --base <filename>
    //git diff <sourcebranch> <targetbranch>
    var baseCmd = 'git diff' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};







/******************************EXECUTION FUNCTIONS***************************?
/**
 * asynchronously executes a command in the terminal, logs output to console
 * @param command - command to be executed
 */
function execute_async(command, options) {
    const exec = child_process.exec;
    exec(command, options, function(error, stdout, stderr){
            if (error) {
                console.error("exec error"+error);
                return;
            }
            console.log("stdout"+stdout);
        console.log("stderr: "+stderr);
    });

}

/**
 * asynchronously executes a command in the terminal, logs output to console
 * @param command - command to be executed
 */
function spawn_async(command, args, options) {
    if(!args){args = []};
    const spawn = child_process.spawn;
    var proc = spawn("cmd",["/c",command], options);
    proc.stdout.on('data', function(data) {
        console.log("stdout: "+data);
    });
    proc.stderr.on('data', function(data) {
        console.log("stderr: "+data);
    });
    proc.on('close', function(code) {
        console.log("code: "+code);
    });
}

/**
 * asynchronously executes a command in the terminal, logs output to console
 * @param command - command to be executed
 */
function spawn_sync(command, args, options) {
    if(options.cwd != null && (options.cwd.includes('easy_hub') || options.cwd.includes('senior-design'))) {
        console.error('Attempted to execute command on EasyHub repo: ' + command);
    }
    if(!args){args = []};
    var proc = child_process.spawnSync(command, options);
    return {process: proc, command: command};

}

/**
 *
 * @param command
 * @param dir
 * @returns {*}
 */
function execute_sync(command, options) {
    return child_process.execSync(command,  options);
}