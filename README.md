# FullStackOverflow_API

Have you ever had a technical question and didn't know where to ask? This is an API for you! </br>
> API link: https://fullstack-overflow.herokuapp.com/

## About

FullstackOverflow is an API where people can freely post and answer questions. Each question can have only one answer or none (if it hasn't been answered yet).

Below are the implemented routes:

- POST /questions -> Adds a new question and returns the question id. The body must be in the following format:
```
{
	"question": "Your question",
	"student": "Your name",
	"group": "Your class",
	"tags": "typescript, life, javascript, java?"
}
```
And the returned id will be:
```
{
	"id": questionIdNumber,
}
```
- GET /questions -> Gets all not answered questions in the following format:
```
[
	{
		"id": questionIdNumber,
		"question": "Some question", 
		"student": "Some student", 
		"group": "Some class code",
		"submitAt": "Timestamp with the date and time when the question was asked"
	},
]
```
- GET /questions/:id -> Gets question filtered by id in one of the following formats:
If the question hasn`t been answered yet:
```
{
	"question": "Some question",
	"student": "Some student",
	"group": "Some class code",
	"tags": "typescript, life, javascript, java?",
  	"answered": false,
	"submitAt": "Timestamp with the date and time when the question was asked"
}
```
If the question has already been answered:
```
{	
	"question": "Some question",
	"student": "Some student",
	"group": "Some class code",
	"tags": "typescript, life, javascript, java?",
  	"answered": true,
	"submitAt": "Timestamp with the date and time when the question was asked"
	"answeredAt": "Timestamp with the date and time when the question was answered"
	"answeredBy": "Name of student who answered the question",
	"answer": "The question answer" 
}
```
- POST /users -> Register a new student and returns token used to answer questions. The body must be in the following format:
```
{
	"name": "User name",
	"group": "class code" 
}
```
And the returned token will be:
```
{
	"token": "Some uuid token"
}
```
- POST /questions/:id -> This route is used to answer questions based on the question id and it should capture a Bearer token which will be used to identify who answered the question.
Body:
```
{
	"answer": "The question answer" 
}
```

## Technologies
Main thechnologies used in the construction of the project:<br>
<p>
  <img src="https://img.shields.io/badge/-Typescript-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Nodejs-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Express-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-PostgreSQL-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Jest-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/-Supertest-green?style=for-the-badge" />
</p>

Some frameworks and concepts:
<img align="right" width="50%" src="https://user-images.githubusercontent.com/84607762/144898252-6a1404fd-a03f-4924-9757-f556565eb7c6.png" />
<p align="left">
* <a href="https://github.com/winstonjs/winston">winston</a> </br>
* <a href="https://github.com/sideway/joi">Joi</a>  </br>
* Clean code and code standard - <a href="https://eslint.org/">eslint</a>, <a href="https://prettier.io/">prettier</a> and <a href="https://github.com/typicode/husky">husky</a> </br>
* Dev, test and production environments - <a href="https://github.com/motdotla/dotenv">dotenv</a> </br>
* Unit tests </br>
* Integration tests </br>
* Layered backend architecture </br>
</p>

## How to run

1. Clone the repo
```
git clone https://github.com/PMafra/FullStackOverflow_API.git
```
2. Install NPM packages
```
npm install
```
3. Create .env.dev and .env.test files based on .env.example file

4. Display the back-end scripts with
```
npx ntl
```
5. Choose one of the three options to run back-end:
* **test** - for test environment
* **start** - for production environment
* **dev** - for development environment
