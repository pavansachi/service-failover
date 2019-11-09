# Project

this is typescript enabled node js application

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

### run in development

>  npm run dev

### run and deploy

> npm run prod

#### test the application

> npm test

## curl command to test application

> curl http://localhost:3000/messages -X POST -d \
> '{ 
>  "mail_from": "pavan8sachi@gmail.com", 
>  "mail_to": [ 
>     "pavan8sachi@gmail.com" 
> ], 
> "subject": "mailgun test" 
> }' -H "Content-Type: application/json"

