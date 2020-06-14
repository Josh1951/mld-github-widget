# mld-github-challenge
A component that displays the three most starred GitHub repos for a given language in the last month, developed using Vue.js.
Visit https://dry-headland-69832.herokuapp.com/ to view a demo of the component.

## Installation
#### Requirements
Node.js version 8.10.0
NPM version 6.13.7

Using git clone the repository, or download and unzip the project files.
In the terminal/command line navigate to the root directory of the project files '/mld-github-challenge'.

In the terminal run the command below to install dependencies.

```
npm install
```

## Useage

The component requires 2 properties, language (String) and date (String, all required type conversion is handled inside the component). The language property specifies which programming language the component will display the 3 most popular repositories for. The date property by default is set to the current date of running the application, the API will return the most 'starred' repositories in the specified language that have been created 1 month prior to this date.

````
<GithubTop language="JavaScript" :date="date"/>
````

### Serve the application

In the root directory run the command below to start the server.
Open link displayed in terminal in your chosen web browser, alternatively manually 
```
npm run serve
```

### Compiles and minifies for production

All static files are created in the /dist directory by running the command below.

```
npm run build
```

### API limitations

The github API the component uses limits you to make up to 10 requests per minute, should you exceed this limit and error message will display on the component.

In order to keep the API available to all users, Github has limited the amount of time a request can take to complete, if the request exceeds the limit before finiding all results the response may return 'incomplete_results', in this instance the component will display an error.
