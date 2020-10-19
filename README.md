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
const url = require('url');
const path = require('path');
const fs = require("fs");
const customHandlebars = require('./modules/renders');

// initialization Custom handlebars
const newHandlebars = new customHandlebars(
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'layouts'),
    'main.hbs',
    path.join(__dirname, 'views', 'temp')
);

// Electron Reload
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {});
};

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
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
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
    newProductWindow.setMenu(null)
    newProductWindow.loadURL(newHandlebars.render('products/new.hbs'));
    newProductWindow.on("closed", () => {
        newProductWindow = null;
    });
};

// Menu Template
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow()
                }
            },
            {
                label: 'Remove All Products',
                click() {

                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            },
            {
                label: 'Show/Hide DevTools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                },
                accelerator: 'Ctrl+Shift+I'
            }
        ]
    },
];
```