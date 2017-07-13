const {exec} = require('child_process');

const docker = {
    compose: function ({workpath = '.', composeFile = 'docker-compose.yml', flags = ['-d', '--no-recreate']} = {}) {
        return new Promise(function (resolve, reject) {
            let cmd = `docker-compose -f "${composeFile}" up ${flags.join(" ")}`;
            let process = exec(cmd, {cwd: workpath, stdio: 'inherit'},
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                }
            );
            process.stdout.on("data", (data) => {
                console.log(data.toString());
            });
            process.stderr.on("data", (data) => {
                console.error(data.toString());
            });
        });
    },
};

module.exports = docker;