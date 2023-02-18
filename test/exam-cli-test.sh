#! /bin/bash

echo "Login as admin"
se2234 login --username admin --passw admin
echo -e "\n"

echo "Perform a healtcheck"
se2234 healthcheck
echo -e "\n"

echo "Get demo survey"
se2234 questionnaire --questionnaire_id QQ999
echo -e "\n"

echo "Get every answer given in first question"
se2234 getquestionanswers --questionnaire_id QQ999 --question_id Q01
echo -e "\n"

echo "Reset database"
se2234 resetall
echo -e "\n"

echo "Create a new survey from a JSON file"
se2234 questionnaire_upd --source test_survey1.json
echo -e "\n"

echo "Get the created survey"
se2234 questionnaire --questionnaire_id QQ999
echo -e "\n"

echo "Logout"
se2234 logout
echo -e "\n"