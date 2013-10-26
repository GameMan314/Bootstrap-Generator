'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var TestGenerator = module.exports = function TestGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TestGenerator, yeoman.generators.Base);

TestGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
      {
          name: "name",
          message: "What is the name of your project?"
      },
 
      {
          name: "description",
          message: "Give me a description on what your app is supposed to do",
          default: "A sample description"
      },
 
      {
          name: "keywords",
          message: "Give me keywords that correspond to the site. (comma-separated)",
          default: "keyword 1, keyword 2, keyword 3, etc."
      },
 
      //author and header info
      {
          name: "authorName",
          message: "What is your name?",
          default: "Your Name",
      },
 
      {
          name: "authorGitHub",
          default: "Username",
          message: "What is your gitHub account?"
      },
	  
	  {
          name: "authorURL",
          default: "www.github.com",
          message: "What is your website URL?"
      },
	  
      {
          name: "authorEmail",
          default: "Someone@Example.com",
          message: "What is your email address?"
      },
	  
      {
          name: "authorCompanyName",
          default: "Company",
          message: "What is your companies name?"
      },
 	  
      {
          name: "includeGlyphs",
		  type: "confirm",
          default: true,
          message: "Include glyphs?"
      },
	  
	  {
		  name: "include404",
		  type: "confirm",
		  default: true,
          message: "Include 404 page?"
	  },
	  
	  {
		  name: "includeRobotsTxt",
		  type: "confirm",
		  default: true,
          message: "Include Robots.txt?"
	  },
	  
	  {
		  name: "includeHtaccess",
		  type: "confirm",
		  default: true,
          message: "Include .htaccess file?"
	  },
	  
	  {
		  name: "includeIcons",
		  type: "confirm",
		  default: true,
          message: "Include Icons?"
	  }
	  
  ];

  this.prompt(prompts, function (props) {
    this.name = props.name;
	this.description = props.description;
	this.keywords = props.keywords;
	this.authorName = props.authorName;
	this.authorGitHub = props.authorGitHub;
	this.includeGlyphs = props.includeGlyphs;
	this.include404 = props.include404;
	this.includeRobotsTxt = props.includeRobotsTxt
	this.includeHtaccess = props.includeHtaccess
	this.includeIcons = props.includeIcons
	this.authorURL = props.authorURL
	this.authorEmail = props.authorEmail
	this.authorCompanyName = props.authorCompanyName

    cb();
  }.bind(this));
};

TestGenerator.prototype.app = function app() {
  this.template("_index.html", "index.html");
  
  //...
  
  //css
  this.mkdir("css");
  this.copy("css/bootstrap.css");
  this.copy("css/bootstrap.min.css");
  this.copy("css/bootstrap-theme.css");
  this.copy("css/bootstrap-theme.min.css");
  this.copy("css/main.css");
  
  //JavaScript
  this.mkdir("js");
  this.copy("js/_main.js");
  this.copy("js/plugins.js");
  
  this.mkdir("js/vendor");
  this.copy("js/vendor/bootstrap.js");
  this.copy("js/vendor/bootstrap.min.js");
  this.copy("js/vendor/jquery-1.10.1.min.js");
  this.copy("js/vendor/modernizr-2.6.2-respond-1.1.0.min.js");
  
  //img
  this.mkdir("img");
  
  //robots
  if (this.includeRobotsTxt) {
	    this.copy("robots.txt");
   }
   
  //htaccess
  if (this.includeHtaccess){
	  this.copy(".htaccess");
   }
  
  //icons
  if (this.includeIcons) {
	  this.copy("favicon.ico");
	  this.copy("apple-touch-icon.png");
	  this.copy("apple-touch-icon-57x57-precomposed.png");
	  this.copy("apple-touch-icon-72x72-precomposed.png");
	  this.copy("apple-touch-icon-114x114-precomposed.png");
	  this.copy("apple-touch-icon-144x144-precomposed.png");
	  this.copy("apple-touch-icon-precomposed.png");
   }
  
  //Glyphs
  if (this.includeGlyphs) {
        this.mkdir("fonts");
        this.copy("fonts/glyphicons-halflings-regular.eot", "fonts/glyphicons-halflings-regular.eot");
		this.copy("fonts/glyphicons-halflings-regular.svg", "fonts/glyphicons-halflings-regular.svg");
		this.copy("fonts/glyphicons-halflings-regular.ttf", "fonts/glyphicons-halflings-regular.ttf");
		this.copy("fonts/glyphicons-halflings-regular.woff", "fonts/glyphicons-halflings-regular.woff");
    }
	
  //404 Page
  if (this.includeGlyphs) {
	    this.copy("404.html");
   }
};

TestGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
