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
gitUtils.clone = function(remote, dest, osShell) {
    var baseCmd = 'git clone ' + remote;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

/**
 * retrieves the status of the git repository
 * @param dest
 * @param osShell
 * @returns {{process, command}|*}
 */
gitUtils.status = function(dest, osShell) {
    return spawn_sync('git status', [], {cwd: dest, shell: osShell});
};

/**
 * attempts to initialize a git repository
 * @param dest - path to new repository on local filesystem
 */
gitUtils.init = function(dest, osShell) {
    spawn_sync('git init', [], {cwd: dest, shell: osShell});
};

gitUtils.getLocalBranches = function(dest, osShell) {
    return spawn_sync('git branch', [], {cwd: dest, shell: osShell});
};

gitUtils.getRemoteBranches = function(dest, osShell) {
    return spawn_sync('git branch -r', [], {cwd: dest, shell: osShell});
};

gitUtils.getAllBranches = function(dest, osShell) {
    return spawn_sync('git branch -a', [], {cwd: dest, shell: osShell});
};

gitUtils.getAllBranches = function(dest, osShell) {
    var baseCmd = 'git branch -a';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

    //return String(execute_sync('git branch -a', {cwd: dest})).split("\n");

};

gitUtils.commit = function (message, dest, osShell) {
    var baseCmd = 'git commit -a -m ' + "\""+ message + "\"";
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.add = function (dest, osShell) {
    var baseCmd = 'git add .';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.config = function (dest, osShell) {
    //git config --global user.name "Sam Smith"
    //git config --global user.email
    //var baseCmd = 'git config ?';p
    // return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
    console.warn("config not implemented")
};

gitUtils.push = function (branch, dest, osShell) {
    //need origin, need master
    var baseCmd = 'git push origin '+ branch;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});};

gitUtils.getStatus = function (dest, osShell) {
    var baseCmd = 'git status';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.checkoutNewBranch = function (branch,dest, osShell) {
    var baseCmd = 'git checkout -b ' + branch;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.switchBranch = function (branch, dest, osShell) {
    var baseCmd = 'git checkout ' +branch;
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
};

gitUtils.pull = function (dest, osShell) {
    var baseCmd = 'git pull';
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});
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

function repoDelete(path, dest, osShell) {
    var baseCmd;
    if(osShell == "cmd.exe") {
        var baseCmd = 'rmdir ' + path + ' /s /q';
    } else {
        baseCmd = 'rm -r -f ' + path;
    }
    return spawn_sync(baseCmd, [], {cwd: dest, shell: osShell});

}

