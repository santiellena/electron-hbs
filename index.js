'use strict';
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');
const uuid = require('uuid');

let presetRootTemps = path.join(__dirname, 'temp');

class handlebarsRender {
    /**
     * 
     * @param {String} pathToViews 
     * @param {String} pathToTemps 
     * @param {String} defaultLayout 
     * @param {String} pathToLayouts 
     */
    constructor(pathToViews, pathToLayouts, defaultLayout = 'main.hbs', pathToTemps = presetRootTemps) {
        if (!pathToViews) throw new Error('The path to views was not provisioned');
        if (!pathToLayouts) throw new Error('The path layouts was not provisioned');
        if (!path.isAbsolute(pathToViews)) throw new Error('The path to views must be absolute');
        if (!path.isAbsolute(pathToLayouts)) throw new Error('The path to layouts must be absolute');
        if (!path.isAbsolute(pathToTemps)) throw new Error('The path to temps must be absolute');

        if (!fs.existsSync(pathToTemps)) fs.mkdirSync(pathToTemps);
        this.views = pathToViews;
        this.temps = pathToTemps;
        this.layouts = pathToLayouts;
        this.defaultLayout = defaultLayout;
    };
    /**
     * Renders the file and returns the path to temp file
     * @param {String} file 
     * @param {Object} objectToRender 
     * @returns {String} Path to temp file
     */
    render(file, objectToRender = {}) {
        if (!file) throw new Error('The file to render whas not provided');
        if (typeof file != 'string') throw new Error(`The first argument must be an string, recived ${typeof file}`);
        if (typeof objectToRender != 'object') throw new Error(`The second argument must be an object, recived ${typeof objectToRender}`);
        let pathToFile = path.join(this.views, file);
        if (!fs.existsSync(pathToFile)) throw new Error(`The file ${file} don\'t exist`)
        let fileBody = (fs.readFileSync(pathToFile)).toString();
        let fileReaded = (fs.readFileSync(path.join(this.layouts, this.defaultLayout))).toString();
        let precompile = (handlebars.compile(fileBody))(objectToRender);
        objectToRender.body = precompile;
        let compiled = handlebars.compile(fileReaded)(objectToRender,{});
        let identifier = path.join(this.temps, `${uuid.v4()}.html`);
        fs.writeFileSync(identifier, compiled);
        return identifier;
    };
    /**
     * Clears the temp folder
     */
    clearTemps() {
        fs.rmdirSync(this.temps, { recursive: true });
    };
};

module.exports = handlebarsRender;