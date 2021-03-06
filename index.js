#!/usr/bin/env node

"use strict";

var CommandsParser = require("./lib/utils/commands-parser");
var commands = new CommandsParser();

var Helpers = require("./lib/utils/helpers");
var helpers = new Helpers();

var _ =require("lodash");

var updateNotifier = require("update-notifier");
var pkg = require("./package.json");

updateNotifier({packageName: pkg.name, packageVersion: pkg.version,updateCheckInterval:1000}).notify();

var bundled_commands = ["new","build","serve","version","addon","install","test"];
var command = process.argv[2];

function runCommands(){
  if(_.contains(bundled_commands,command)){
    commands.runBundled();
  }else if(command === "-h"){
    commands.autoRun(function(){
      commands.runBundled();
    });
  }else if(typeof(command) !== "undefined"){
    commands.autoRun();
  }
}

if(_.contains(["build","serve","test","generate"],command)){
  helpers.checkForOldApp(function(){
    runCommands();
  });
}else{
  runCommands();
}
