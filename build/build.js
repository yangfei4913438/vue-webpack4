'use strict'
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')
const exec = require('child_process').exec
const fs = require('fs')

// 更新版本号
function updateVersion() {
  // 修改版本号
  const projectConfig = require('../package.json')
  let ver = projectConfig.version.split('.')
  ver[3] = parseInt(ver[3]) + 1
  projectConfig.version = ver.join('.')
  // 文件的绝对路径
  let url = path.resolve(__dirname, '../package.json')
  // 同步写入package.json文件, 这里需要绝对路径
  fs.writeFileSync(url, JSON.stringify(projectConfig,null,2))
  // git处理
  let branch = "release/" + projectConfig.version
  //创建新分支
  exec('git branch ' + branch, function (error, stdout, stderr) {
    console.log("-----------创建新分支:%s DONE-----------", branch)
    //切换分支
    exec('git checkout ' + branch, function (error, stdout, stderr) {
      console.log("-----------切换新分支:%s DONE-----------", branch)
      //添加修改文件
      exec('git add ' + url, function (error, stdout, stderr) {
        console.log("[添加修改文件输出：%s]", stdout)
        //提交文件
        exec(`git commit -m "更新package.json文件的版本号: ${projectConfig.version}"`, function (error, stdout, stderr) {
          console.log("[提交修改文件输出：%s]", stdout)
          //推送分支
          exec('git push -u origin ' + branch, function (error, stdout, stderr) {
            console.log("[推送至分支:%s输出：%s]", branch, stdout||error||stderr)
            console.log("-----------提交修改文件完成-----------")
          })
        })
      })
    })
  })
}

const spinner = ora('building for production...')
spinner.start()

rm(path.join(path.resolve(__dirname, '../dist'), 'static'), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening home.html over file:// won\'t work.\n'
    ))
    // 更新小版本号
    updateVersion()
  })
})
