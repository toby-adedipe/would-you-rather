# Would You Rather?

This project is a webapp that functions like the popular game "would you rather?". A user signs in, answeres a series of question. The user can view the leaderboard of other players to see their scores, they can create new questions and can view answered polls. The project is a demonstration of how to use redux, react-redux and redux-thunk in single page applications.

## Installation and development

Get started developing by executing the following commands: `npm install`

To start the developement server:
`npm start`

## Backend server

This project utilizes a mock backend api that acts as a database. All names and data are fictional.

It has 3 API calls :

* [`getInitialData`](#getInitialData)
* [`saveAnswer`](#saveAnswer)
* [`saveQuestion`](#saveQuestion)

### `getInitialData`

Method Signature:

```js
getInitialData()
```

* Returns a promise containing all the inital data stored in the database, this includes every user and question stored in the database

### `saveAnswer`

Method Signature:

```js
saveAnswer(answer)
```

* Saves the answer chosen by the authenticated user to the store

### saveQuestion

Method Signature:

```js
saveQuestion(info)
```
* Saves the new question created by an authenticated user


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
