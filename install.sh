#! /bin/bash

USERNAME="root"
read -p "MySQL Database username: (default: root) " USERNAME
read -s -p "MySQL Database password: (default: <blank>) " PASSWORD
echo -e "APP_ENV=staging\nDB_USER=$USERNAME\nDB_PASS=$PASSWORD" >> .env
cd api-backend/
npm install

cd ../cli/
npm install
sudo npm link

cd ../frontend
npm install
sudo npm i -g serve
npm run build