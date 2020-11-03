
// This is a module
(function() {
	'use strict';
	// Code here
})();

// This is an exported module.
var myModule = (function() {
	'use strict';

})();

// This is an exported module with methods.
var myModule = (function() {
	'use strict';
	// Code here

	// Becuase it's curly brackets it's an object
	return {
		publicMethod: function() {
			console.log('Hello World!');
		}
	}
})();
myModule.publicMethod(); // Outputs Hello World!


// The Revealing Module Pattern
var myModule = (function() {
	'use strict';
  
	var _privateProperty = 'Hello World';
	var publicProperty = 'I am a public property';
  
	function _privateMethod() {
	  console.log(_privateProperty);
	}
  
	function publicMethod() {
	  _privateMethod();
	}
  
	return {
	  publicMethod: publicMethod,
	  publicProperty: publicProperty
	};
  })();

  //DOM Manipulation with a Module
  const Formatter = (function(doc) {
	const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
  
	const makeUppercase = (text) => {
	  log("Making uppercase");
	  return text.toUpperCase();
	};
  
	const writeToDOM = (selector, message) => {
	  if (!!doc && "querySelector" in doc) {
		doc.querySelector(selector).innerHTML = message;
	  }
	}
  
	return {
	  makeUppercase,
	  writeToDOM,
	}
  })(document);
  
  Formatter.writeToDOM("#target", "Hi there");