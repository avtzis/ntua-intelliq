# CLI

### Structure
  ```sh
  Usage: se2234 [options] [command]

Command Line Interface for the 2022 Software Engineering project

Options:
  -V, --version                 output the version number
  -h, --help                    display help for command

Commands:
  login [options]               login to a user or admin account
  logout                        log out of an account
  healthcheck                   perform a database connection verification
  resetall                      truncate the database
  questionnaire_upd [options]   upload a signle JSON file to create a survey
  resetq [options]              delete all answers given to a survey
  questionnaire [options]       Show survey info
  question [options]            Show question info
  doanswer [options]            start a session and answer a question from a selected survey
  getsessionanswers [options]   show every answer given in a specific session
  getquestionanswers [options]  show every answer given in a specific question
  admin [options]
  help [command]                display help for command
  ```
