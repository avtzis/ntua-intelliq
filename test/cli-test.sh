#! /bin/bash

echo "Login as admin"
se2234 login --username admin --passw admin
echo -e "\n"

echo "Perform a healtcheck"
se2234 healthcheck
echo -e "\n"

echo "Create a new survey from a JSON file"
se2234 questionnaire_upd --source test_survey1.json
echo -e "\n"

echo "Logout"
se2234 logout
echo -e "\n"

echo "Login as a user"
se2234 login --username user --passw user
echo -e "\n"

echo "Get the created survey"
se2234 questionnaire --questionnaire_id QQ999
echo -e "\n"

echo "Get first question"
se2234 question --questionnaire_id QQ999 --question_id Q01
echo -e "\n"

echo "Answer first question"
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id TEST --option_id Q01A1
echo -e "\n"

echo "Get second question"
se2234 question --questionnaire_id QQ999 --question_id Q02
echo -e "\n"

echo "Answer second question"
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id TEST --option_id Q02A1
echo -e "\n"

echo "Get last question"
se2234 question --questionnaire_id QQ999 --question_id Q03
echo -e "\n"

echo "Answer last question"
se2234 doanswer --questionnaire_id QQ999 --question_id Q03 --session_id TEST --option_id Q03A1
echo -e "\n"

echo "Get answers that were just given"
se2234 getsessionanswers --questionnaire_id QQ999 --session_id TEST
echo -e "\n"

echo "Logout" 
se2234 logout
echo -e "\n"

echo "Login as admin"
se2234 login --username admin --passw admin
echo -e "\n"

echo "Get every answer given in first question"
se2234 getquestionanswers --questionnaire_id QQ999 --question_id Q01
echo -e "\n"

echo "Get every answer given in second question"
se2234 getquestionanswers --questionnaire_id QQ999 --question_id Q02
echo -e "\n"

echo "Get every answer given in last question"
se2234 getquestionanswers --questionnaire_id QQ999 --question_id Q03
echo -e "\n"

echo "Reset answers"
se2234 resetq --questionnaire_id QQ999
echo -e "\n"

echo "Reset database"
se2234 resetall
echo -e "\n"

echo "Logout" 
se2234 logout
echo -e "\n"