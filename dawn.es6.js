/**
 * Automic.js Redawn Library
 * @file dawn.es6.js
 * @author AutomicJS
 * @copyright 2017
 * @license MIT
 * @github https://github.com/AutomicJS/redawn
 * @version 0.0.1
 * @description A simple lighweight compiler for Redawn, designed for the browser. ES6 version, for object version see dawn.js
 */

class Redawn {
    constructor() {
        this.html = '';
        this.src = '';
    }
    /**
     * @class Redawn
     * @method setHTML
     * @property {string} htmlSrc The source html code to set
     */
     setHTML(htmlSrc) {
         this.html = htmlSrc; 
     }
    /**
     * @class Redawn
     * @method setDawn
     * @property {string} dawnSrc The source dawn code to be compiled
     */
     setDawn(dawnSrc) {
         this.src = dawnSrc;
     }
    /**
     * @class Redawn 
     * @method getHTML
     * @description Get the HTML source compiled by Redawn
     * @returns {string} The HTML source compiled by Redawn
     */
    getHTML() {
        return this.html;
    }
    /**
     * @class Redawn 
     * @method getDawn
     * @description Get the Dawn source yet to be compiled by Redawn
     * @returns {string} The raw Redawn to be compiled yet
     */
    getDawn() {
        return this.src;
    }
    /**
     * @todo this function will serve in the future as an HTML to Redawn compiler, and produce Dawn code, to be completed.
     */
    compileExperimental() {} 
    /**
     * @class Redawn
     * @method compile
     * @description All the magic happens here, the compiler will take off and produce the HTML from the Redawn source code 
     * @returns {string}
     */
    compile() {
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
            multiStyling: /\@\#(.*)\|\#([A-Za-z0-9]+)(.*)/g,
            multiSpecifiedStyling: /\@\#(.*)\|\#([A-Za-z0-9]+)\|([A-Za-z0-9]+)(.*)/g,
            htmlTags: /\!([A-Za-z0-9]+) (.*)/g,
            classedHtmlTags: /\!([A-Za-z0-9]+)\.([A-Za-z0-9]+) (.*)/g,
            newBreakline: /\@\@br|\@\@nl|\@\@breakline+|\@\@newline|\\r\\n|\\n|\@\@/g,
            codeLine: /\`\`\`(.*)/g,
            endCodeLine: /\`\`/g,
            exclusionTag: /\@\!\!\!/g,
        };
        var lineMatcher = src.split(/\r?\n/); 
        for(var i = 0; i < lineMatcher.length; i++) {
        var line = lineMatcher[i];
        if( line == "" || line.length == 0 ) {
            line = "<br>";
        }
        if( line.match( regexBuilderArray.bold ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.bold, '<strong>$1</strong>');
        }
        else if ( line.match(regexBuilderArray.codeLine) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = "<code data-codetype='$1'>";            
        }
        else if ( line.match(regexBuilderArray.endCodeLine) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = "</code>";
        }
        else if ( line.match(regexBuilderArray.htmlTags) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.htmlTags, '<$1>$2</$1>');
        }
        else if ( line.match(regexBuilderArray.classedHtmlTags) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.classedHtmlTags, '<$1 class="$2">$3</$1>');
        }
        else if ( line.match(regexBuilderArray.newBreakline) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.newBreakline, '<br>');
        }
        else if ( line.match(regexBuilderArray.multiSpecifiedStyling) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.multiSpecifiedStyling, '<$3 style="background:#$1;color:#$2;">$4</$3>');
        }
        else if ( line.match(regexBuilderArray.multiStyling) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.multiStyling, '<p style="background:#$1;color:#$2;padding:4px;">$3</p>');
        }
        else if ( line.match(regexBuilderArray.backgroundStyling) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.backgroundStyling, '<p style="background:$1">$2</p>');
        }
        else if ( line.match ( regexBuilderArray.colorStyling ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.colorStyling, '<p style="color:#$1;">$2</p>');
        }
        else if ( line.match( regexBuilderArray.pageLinkRef ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.pageLinkRef, '<a href="#$1">(view)</a>');
        }
        else if ( line.match( regexBuilderArray.subtitle ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.subtitle, '<h3>$1</h3>');
        }
        else if ( line.match( regexBuilderArray.title ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.title, '<h1>$1</h1>');
        }
        else if ( line.match( regexBuilderArray.italics ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.italics, '<i>$1</i>');
        }
        else if ( line.match( regexBuilderArray.link ) && !line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace(regexBuilderArray.link, '<a href="$2">$1</a>'); 
        }
        else if ( line.match(regexBuilderArray.exclusionTag) ) {
            line = line.replace('@!!!', ''); 
        }
        lineMatcher[i] = line + "\n";
        }
        var compiled = lineMatcher.join("\n");
        return compiled; 
    }
}