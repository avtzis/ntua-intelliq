#! /bin/bash

#admin
se2234 login --username admin --passw admin
se2234 questionnaire_upd --source survey_demo.json
se2234 logout

#user
se2234 login --username user --passw user
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id DEMA --option_id Q01A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id DEMA --option_id Q02A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q03 --session_id DEMA --option_id Q03A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q05 --session_id DEMA --option_id Q05A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q07 --session_id DEMA --option_id Q07A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q08 --session_id DEMA --option_id Q08A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q09 --session_id DEMA --option_id Q09A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q10 --session_id DEMA --option_id Q10A1
se2234 logout

#user1
se2234 login --username user1 --passw user1
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id DEMB --option_id Q01A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id DEMB --option_id Q02A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q03 --session_id DEMB --option_id Q03A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q05 --session_id DEMB --option_id Q05A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q07 --session_id DEMB --option_id Q07A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q08 --session_id DEMB --option_id Q08A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q09 --session_id DEMB --option_id Q09A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q10 --session_id DEMB --option_id Q10A1
se2234 logout

#user2
se2234 login --username user2 --passw user2
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id DEMC --option_id Q01A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id DEMC --option_id Q02A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q04 --session_id DEMC --option_id Q04A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q06 --session_id DEMC --option_id Q06A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q08 --session_id DEMC --option_id Q08A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q09 --session_id DEMC --option_id Q09A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q10 --session_id DEMC --option_id Q10A2
se2234 logout

#user3
se2234 login --username user3 --passw user3
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id DEMD --option_id Q01A3
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id DEMD --option_id Q02A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q04 --session_id DEMD --option_id Q04A3
se2234 doanswer --questionnaire_id QQ999 --question_id Q06 --session_id DEMD --option_id Q06A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q07 --session_id DEMD --option_id Q07A3
se2234 doanswer --questionnaire_id QQ999 --question_id Q08 --session_id DEMD --option_id Q08A3
se2234 doanswer --questionnaire_id QQ999 --question_id Q09 --session_id DEMD --option_id Q09A3
se2234 doanswer --questionnaire_id QQ999 --question_id Q10 --session_id DEMD --option_id Q10A3
se2234 logout

#user4
se2234 login --username user4 --passw user4
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id DEME --option_id Q01A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id DEME --option_id Q02A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q03 --session_id DEME --option_id Q03A4
se2234 doanswer --questionnaire_id QQ999 --question_id Q05 --session_id DEME --option_id Q05A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q07 --session_id DEME --option_id Q07A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q08 --session_id DEME --option_id Q08A4
se2234 doanswer --questionnaire_id QQ999 --question_id Q09 --session_id DEME --option_id Q09A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q10 --session_id DEME --option_id Q10A4
se2234 logout

#user5
se2234 login --username user5 --passw user5
se2234 doanswer --questionnaire_id QQ999 --question_id Q01 --session_id DEMF --option_id Q01A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q02 --session_id DEMF --option_id Q02A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q04 --session_id DEMF --option_id Q04A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q06 --session_id DEMF --option_id Q06A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q07 --session_id DEMF --option_id Q07A4
se2234 doanswer --questionnaire_id QQ999 --question_id Q08 --session_id DEMF --option_id Q08A1
se2234 doanswer --questionnaire_id QQ999 --question_id Q09 --session_id DEMF --option_id Q09A2
se2234 doanswer --questionnaire_id QQ999 --question_id Q10 --session_id DEMF --option_id Q10A3
se2234 logout