# Electron Handlebars

A simple way to use handlebars with electron

## Usage

example constructor:
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
    {{{body}}}<!-- the body recive the view template -->
</body>
</html>
```
### example index.hbs

```html
<h1>hello world</h1>
{{name}}
```

### Function render

```js
newHandlebars.render('welcome/index.hbs', {name: 'Jonson'}) // thats returns the path to temp file
```
### result 

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

### structure of views Folders

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
