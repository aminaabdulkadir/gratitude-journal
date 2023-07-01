# Gratitude Journal.


![Gratitude Journal](https://i.postimg.cc/TPyBHMVd/gratitude-journal-journal.png)

## Introduction
The Gratitude Journal is a CRUD application to make daily gratitude. 

Everyone knows that they need to give more gratitude, and it is an easy thing to do, yet almost everyone admits that they are not doing it. The solution could be anything that makes gratitude a daily habit in our lives, and this application is one solution :sparkles:

## Features
- Each user has their own journal that is associated with their user ID.
- The ability to view any note with the creation date, delete, and edit it.
- Users' journals are stored and managed with MongoDB Atlas.
- The fronted part has been built with React library and Sass framework.
- Images are stored in Firebase storage.
- State managment is done with Redux toolkit.
- The Rest API has been built with Node.js, Express middleware, and MongoDB. 
- Authentication and authorization are done with JSON Web Token (JWT).


## Using the Application
After creating an account, you will be able to view your gratitude journal and add new notes, you can add a picture to your note to make it more rememberable.
Use the add icon to create a new gratitude note, if you want to edit any note, click on it, and when you are done save the change. To delete any note, click on the delete icon.

#### Authentication Information
Username: test

Password: test

## Running Gratitude Journal Locally
1. Clone the project.
2. install dependencies by running (npm install or yarn install) in the command line/ terminal.
3. set the required environment variables: (PORT- MongoDB URL - JWT secret ) 
4. start the backend by running (npm run start) in the server directory.
5. Start the fronted by running (npm run start) in the client directory.

## Dependencies
- Babel
- Webpack
- React
- React-DOM
- Sass
- Axios
- Redux.js
- React-router-dom
- Express.js
- Mongoose
- Json Web Token
- Crypto-js
- Cors
- Dotenv
- Material-ui
