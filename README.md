# Electron Handlebars

A simple way to use handlebars with electron

## Usage

### example constructor:
```js
const newHandlebars = new customHandlebars(
    path.join(__dirname, 'views'), // the path to views folder
    path.join(__dirname, 'views', 'layouts'), // the path to layouts
    'main.hbs',// the main file i'ts similar to the following example
    path.join(__dirname, 'views', 'temp') // the temp folder i'ts very important because since that's where all the .html already rendered are saved
);
```

### example main.hbs

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/style.css">
    <title>Document</title>
</head>
<body>
    {{{body}}}<!-- the body take the view template -->
</body>
</html>
```
### Example index.hbs

```html
<h1>hello world</h1>
{{name}}
```

### Function render

```js
newHandlebars.render('welcome/index.hbs', {name: 'Jonson'}) // thats returns the path to temp file
```
### Result 

```html
<!-- the name of file is 806fe983-4bbc-4290-bd5b-f7ffd8058d91.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../public/style.css">
    <title>Document</title>
</head>
<body>
    <h1>hello world</h1>
    Jonson
</body>
</html>

```

### Structure of views Folders

```
├───layouts
│       main.hbs
│
├───products
│       new.hbs
│
├───temp
│       806fe983-4bbc-4290-bd5b-f7ffd8058d91.html
│
└───welcome
        index.hbs
```

### Example usage on electron

```js
const { app, BrowserWindow, Menu } = require("electron");
const path = require('path');
const handlebarsHbs = require('handlebars-hbs');

// initialization Custom handlebars
const newHandlebars = new handlebarsHbs(
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'layouts'),
    'main.hbs',
    path.join(__dirname, 'views', 'temp')
);

// Declaratios of windows
let mainMindow;
let newProductWindow;

// Main window
app.on("ready", () => {
    mainMindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainMindow.loadURL(newHandlebars.render('welcome/index.hbs'));
    mainMindow.on("closed", () => {
        app.quit()
    });
});

// removes all rendered files 
app.on("quit", () => {
    newHandlebars.clearTemps();
});

// New product window
function createNewProductWindow() {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a new product',
        webPreferences: {
            nodeIntegration: true
        }
    });
    newProductWindow.loadURL(newHandlebars.render('products/new.hbs'));
    newProductWindow.on("closed", () => {
        newProductWindow = null;
    });
};

```
## Why this module

this module enable the usage handlebars much simpler saving many headaches using functions and methods even more and understandable