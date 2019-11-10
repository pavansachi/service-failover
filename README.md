# Project

This is typescript enabled node js application

## Libraries

* Node JS, javascript execution environment
* npm , node package manager
* nodemon, for hot deployment during development
* dotenv, to maintain environment vars
* Express, for building API
* Typescript, for transpiling javascript and can use ES6 features
* Jest, for testing
* Mail Gun, email provider API
* Send Gun, email provider API

## Usage

### build application

> npm run build

### environment variables

change the env variables in .env file in the root directory

> PORT=3000
> MAILGUN_API=https://api.mailgun.net/v3/sandboxbb9294b0d66741b2a60a57daa672677a.mailgun.org
> TEST_SUBJECT=Test Mail
> MAILGUN_USER=api
> MAILGUN_PASSWORD=

> SENDGRID_API=https://api.sendgrid.com/v3/mail
> SENDGRID_API_KEY=

### run in development

> npm run dev

### run and deploy in production

> npm run build
> npm run prod

#### test the application

> npm test

#### deploy on local using docker

##### deploy if nodejs and npm available

> npm run dev

##### deploy with docker-compose

> docker-compose build
> docker-compose up

## curl command to test application

curl http://localhost:3000/status -v

curl http://localhost:3000/api/v1/messages -d \
 '{ 
  "mail_from": "pavan8sachi@gmail.com", 
  "mail_to": [ 
     "pavan8sachi@gmail.com" 
 ], 
 "subject": "test subject",
 "text": "test text" 
 }' -H "Content-Type: application/json"

