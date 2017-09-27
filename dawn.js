/**
 * Automic.js Framework
 * @file dawn.js
 * @author AutomicJS
 * @copyright 2017
 * @license MIT
 * @github https://github.com/AutomicJS/redawn
 * @version 0.0.1
 * @description A simple lighweight compiler for Redawn, designed for the browser
 */

var Redawn = function () {
    this.html   = '';
    this.src    = '';
};

Redawn.prototype.setHTML = function (htmlSrc) {
    this.html   = htmlSrc;
};
Redawn.prototype.setDawn = function (dawnSrc) {
    this.src    = dawnSrc;
}; 
Redawn.prototype.getHTML = function () {
    return this.html;
};
Redawn.prototype.getDawn = function () {
    return this.src;
};
Redawn.prototype.compileExperimental = function () {
    if ( typeof this.src === 'undefined' || this.src === '' ) {
        return new Error('Failed to compile, the source is undefined or empty.');
    }
    var src = this.src;
};
Redawn.prototype.compile = function () {
    if ( typeof this.src === 'undefined' || this.src === '' ) {
        return new Error('Failed to compile, the source is undefined or empty.');
    }
    var src = this.src; 
    var regexBuilderArray = {
        bold: /\*\*(.*)\*\*/g,
        italics: /\*(.*)\*/g,
        link: /\[(.*)\]\((.*)\)/g,
        pageLinkRef: /\@\#(.*)\@/g,
        subtitle: /\#\#(.*)/g,
        title: /\#(.*)/g,
        colorStyling: /\<\#(.*)\>(.*)\<\/\#(.*)\>/g,
        backgroundStyling: /\<\@(.*)\>(.*)\<\/\@(.*)\>/g,
    };
    var lineMatcher = src.split(/\r?\n/); 
    for(var i = 0; i < lineMatcher.length; i++) {
       var line = lineMatcher[i];
       if( line == "" || line.length == 0 ) {
           line = "<br>";
       }
       if( line.match( regexBuilderArray.bold ) ) {
           line = line.replace(regexBuilderArray.bold, '<strong>$1</strong>');
       }
       else if ( line.match(regexBuilderArray.backgroundStyling) ) {
           line = line.replace(regexBuilderArray.backgroundStyling, '<p style="background:$1">$2</p>');
       }
       else if ( line.match ( regexBuilderArray.colorStyling ) ) {
           line = line.replace(regexBuilderArray.colorStyling, '<p style="color:$1;">$2</p>');
       }
       else if ( line.match( regexBuilderArray.pageLinkRef ) ) {
           line = line.replace(regexBuilderArray.pageLinkRef, '<a href="#$1">(view)</a>');
       }
       else if ( line.match( regexBuilderArray.subtitle ) ) {
           line = line.replace(regexBuilderArray.subtitle, '<h3>$1</h3>');
       }
       else if ( line.match( regexBuilderArray.title ) ) {
           line = line.replace(regexBuilderArray.title, '<h1>$1</h1>');
       }
       else if ( line.match( regexBuilderArray.italics ) ) {
           line = line.replace(regexBuilderArray.italics, '<i>$1</i>');
       }
       else if ( line.match( regexBuilderArray.link ) ) {
           line = line.replace(regexBuilderArray.link, '<a href="$2">$1</a>'); 
       }
       lineMatcher[i] = line + "\n";
    }
    var compiled = lineMatcher.join("\n");
    if( compiled.match(regexBuilderArray.bold) || compiled.match(regexBuilderArray.italics) || compiled.match(regexBuilderArray.backgroundStyling) || compiled.match(regexBuilderArray.colorStyling) || compiled.match(regexBuilderArray.link) || compiled.match(regexBuilderArray.title) || compiled.match(regexBuilderArray.subtitle) || compiled.match(regexBuilderArray.pageLinkRef) ) {
        // compiled = this.compile(compiled);
        console.log(compiled);
    }
    return compiled; 
};

