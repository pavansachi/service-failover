# Project

This is typescript enabled node js application with api versioning.  
It uses 2 mail provider API's
* Main Gun (register for account at https://signup.mailgun.com/new/signup)
* Send Grid (register for account at https://signup.sendgrid.com)

1. [ Libraries ](#Libraries)
2. [ Swagger Documentation ](#Swagger-documentation)
3. [ Usage ](#usage)
4. [ Test ](#Test)
5. [ Deploy ](#Deploy)

## Libraries

* Node JS, javascript execution environment
* npm , node package manager
* nodemon, for hot deployment during development
* dotenv, to maintain environment vars
* Express, for building API
* Typescript, for transpiling javascript and can use ES6 features
* Jest, for testing
* axios, for restful requests
* Mail Gun, email provider API
* Send Gun, email provider API

## Swagger documentation

>  http://mail.digiconnect.co/api/v1/docs/ (Prod)  
   http://localhost:3000/api/v1/docs/ (Local)

## Usage

### Build the application

> npm install  
> npm run build

Environment variables (.env)

> PORT=3000  
  MAILGUN_API=https://api.mailgun.net/v3/sandboxbb9294b0d66741b2a60a57daa672677a.mailgun.org  
  TEST_SUBJECT=Test Mail  
  MAILGUN_USER=api  
  MAILGUN_PASSWORD=[[api-key]] 

> SENDGRID_API=https://api.sendgrid.com/v3/mail  
SENDGRID_API_KEY=[[api-key]]  


## Test

> npm install  
> npm test 

## Deploy

### Run and deploy in production

> npm install  
> npm run build  
> npm run prod   

#### Deploy the application

Pre-requisites
  * docker
  * docker-compose
  * node
  * npm

> npm run dev

>  build the docker image  
   docker build -t service-failover .  
   
>  Run the docker container  
   docker run -p 3000:3000 service-failover

>  Run with docker-compose    
   docker-compose up  



### Test the API


#### Local


> curl http://localhost:3000/api/v1/status -v  

>  curl http://localhost:3000/api/v1/messages -d ' \
{ 
  "mail_from": "pavan8sachi@gmail.com",    
  "mail_to": [   
     "pavan8sachi@gmail.com"   
 ],   
 "subject": "test subject",  
 "text": "test text"   
 }' -H "Content-Type: application/json"  

>  curl http://mail.digiconnect.co/api/v1/messages -d ' \
{ 
  "mail_from": "pavan8sachi@gmail.com",    
  "mail_to": [   
     "pavan8sachi@gmail.com"   
 ],   
 "subject": "test subject",  
 "text": "test text"   
 }' -H "Content-Type: application/json"    



#### Production (using curl)


deployed the API at mail.digiconnect.co in AWS cloud

#### Production (using swagger)

http://mail.digiconnect.co/api/v1/docs/