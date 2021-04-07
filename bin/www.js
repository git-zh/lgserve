#! /usr/bin/env node

const { program } = require('commander')

// console.log('执行了')
// program.option('-p --port', 'set server port')

// 配置信息
let options = {
    '-p, --port <dir>': {
        'description': 'init server port',
        'example': 'lgserve -p 3306'
    },
    '-d, --directory <dir>': {
        'description': 'init server directory',
        'example': 'lgserve -d c:'
    },
}

function formatConfig (configs, cb) {
    Object.entries(configs).forEach(([key, value]) => {
        cb(key, value)
    })
    // for (let [key, value] of Object.entries(configs)) {
    //     cb(key, value)
    // }
}
formatConfig(options, (key, value) => {
    program.option(key, value.description)
})

program.on('--help', () => {
    console.log('Examples: ')
    formatConfig(options, (key, value) => {
        console.log(value.example)
    })
})

program.name('lgserve')
let version = require('../package.json').version
program.version(version)

let cmdConfig = program.parse(process.argv)
// console.log(cmdConfig.opts())

let Server = require('../main.js')

new Server(cmdConfig.opts()).start()