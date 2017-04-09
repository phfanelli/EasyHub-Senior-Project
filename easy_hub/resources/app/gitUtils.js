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
 * @returns {{process, command}|*}
 */
gitUtils.clone = function(remote, dest) {
    var baseCmd = 'git clone ' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

/**
 * retrieves the status of the git repository
 * @param dest
 * @returns {{process, command}|*}
 */
gitUtils.status = function(dest) {
    return spawn_sync('git status', [], {cwd: dest, shell: OS_SHELL});
};

/**
 * attempts to initialize a git repository
 * @param dest - path to new repository on local filesystem
 */
gitUtils.init = function(dest) {
    spawn_sync('git init', [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.getLocalBranches = function(dest) {
    return spawn_sync('git branch', [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.getRemoteBranches = function(dest) {
    return spawn_sync('git branch -r', [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.getAllBranches = function(dest) {
    return spawn_sync('git branch -a', [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.getAllBranches = function(dest) {
    var baseCmd = 'git branch -a';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});

    //return String(execute_sync('git branch -a', {cwd: dest})).split("\n");

};

gitUtils.commit = function (message, dest) {
    var baseCmd = 'git commit -a -m ' + "\""+ message + "\"";
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.add = function (dest) {
    var baseCmd = 'git add .';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.config = function (dest) {
    //git config --global user.name "Sam Smith"
    //git config --global user.email
    //var baseCmd = 'git config ?';p
    // return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
    console.warn("config not implemented")
};

gitUtils.push = function (branch, dest) {
    //need origin, need master
    var baseCmd = 'git push origin '+ branch;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});};

gitUtils.getStatus = function (dest) {
    var baseCmd = 'git status';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.createNewBranch = function (branch, dest) {
    var baseCmd = 'git checkout -b ' + branch;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.switchBranch = function (branch, dest) {
    var baseCmd = 'git checkout ' +branch;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.trackRemoteBranch = function (localName, remoteName, dest) {
    var baseCmd = 'git checkout -b ' + localName + ' --track ' + remoteName;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.pull = function (dest) {
    var baseCmd = 'git pull';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.reset = function (dest) {
    var baseCmd = 'git reset --hard';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};

gitUtils.clean = function (dest) {
    var baseCmd = 'git clean -df';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});
};




/******************************EXECUTION FUNCTIONS***************************/

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

function repoDelete(path, dest) {
    var baseCmd;
    if(OS_SHELL == "cmd.exe") {
        var baseCmd = 'rmdir ' + path + ' /s /q';
    } else {
        baseCmd = 'rm -r -f ' + path;
    }
    return spawn_sync(baseCmd, [], {cwd: dest, shell: OS_SHELL});

}

