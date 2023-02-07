#! /usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const login = require('./src/login');
const logout = require('./src/logout');
const healthcheck = require('./src/healthcheck');
const resetall = require('./src/resetall');
const questionnaire_upd = require('./src/questionnaire_upd');
const resetq = require('./src/resetq');
const questionnaire = require('./src/questionnaire');
const question = require('./src/question');
const doanswer = require('./src/doanswer');
const getsessionanswers = require('./src/getsessionanswers');
const getquestionanswers = require('./src/getquestionanswers');
const usermod = require('./src/usermod');
const users = require('./src/users');

program
    .name('se2234')
    .description('Command Line Interface for the 2022 Software Engineering project')
    .version('0.8.3');

program.command('login')
    .description('login to a user or admin account')
    .requiredOption('--username <username>')
    .requiredOption('--passw <password>')
    .action(options => login(options));

program.command('logout')
    .description('log out of an account')
    .action(logout);

program.command('healthcheck')
    .description('perform a database connection verification')
    .action(healthcheck);

program.command('resetall')
    .description('truncate the database')
    .action(resetall);

program.command('questionnaire_upd')
    .description('upload a signle JSON file to create a survey')
    .requiredOption('--source <path>', 'File path name')
    .action(options => questionnaire_upd(options))

program.command('resetq')
    .description('delete all answers given to a survey')
    .requiredOption('--questionnaire_id <surveyID>')
    .action(options => resetq(options));

program.command('questionnaire')
    .description('Show survey info')
    .requiredOption('--questionnaire_id <surveyID>')
    .action(options => questionnaire(options));

program.command('question')
    .description('Show question info')
    .requiredOption('--questionnaire_id <surveyID>')
    .requiredOption('--question_id <questionID>')
    .action(options => question(options));

program.command('doanswer')
    .description('start a session and answer a question from a selected survey')
    .requiredOption('--questionnaire_id <surveyID>')
    .requiredOption('--question_id <questionID>')
    .requiredOption('--session_id <sessionID>')
    .requiredOption('--option_id <optionID>')
    .action(options => doanswer(options));

program.command('getsessionanswers')
    .description('show every answer given in a specific session')
    .requiredOption('--questionnaire_id <surveyID>')
    .requiredOption('--session_id <sessionID>')
    .action(options => getsessionanswers(options));

program.command('getquestionanswers')
    .description('show every answer given in a specific question')
    .requiredOption('--questionnaire_id <surveyID>')
    .requiredOption('--question_id <questionID>')
    .action(options => getquestionanswers(options));

program.command('admin')
    .option('--usermod', 'add an admin account and/or change its password')
    .option('--username <username>')
    .option('--passw <password>')
    .option('--users <user>', 'show users\' info')
    .action(options => {
        if(options.usermod) usermod(options);
        if(options.users) users(options);
    })
    

program.parse();