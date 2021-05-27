/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(54);


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * ninehealth-iec-list.js
 * Help pull up the list of IECs from api /health-fair/ajax/get_iecs and display on the page
 */

var Iecs = {

    /*
     * Input value to initialize component
     */
    options: {
        //component container
        div_container: '.iec-list',

        //the api link to pull json data
        url_data: '/health-fairs/ajax/get-iecs'

    },

    initialize: function initialize() {
        this.setVars().build().events();
    },

    /*
     * Set value for properties of this component
     */
    setVars: function setVars() {
        this.$div_container = $(this.options.div_container);

        this.url_data = this.options.url_data;

        return this;
    },
    /*
     * Prepare data for this component
     */
    build: function build() {
        var $_self = this;

        $.ajax({
            url: $_self.url_data,
            type: 'GET',
            dataType: 'json'

        })
        // Run this if the request succeeds
        .done(function (data) {

            $_self.iecListComponent(data);
        }).fail(function () {
            $_self.$div_container.append("<p>There is no IEC to display</p>");
        });

        return this;
    },
    /*
     * Find an ul tag in this component and append json data to it
     */
    iecListComponent: function iecListComponent(json_data) {

        //console.log(json_data);

        var $ul_container = this.$div_container.find("ul");
        var i = 0;
        var max_count = json_data.length;

        for (i = 0; i < max_count; i++) {
            var website_value = json_data[i].website;

            var html_content = '<li class="accordion-navigation" >' + '<a href="#iec_' + json_data[i].id + '" class="bb-accordion-title"> ' + json_data[i].name + '</a>' + '<div class="content" id="iec_' + json_data[i].id + '">' + json_data[i].purpose;

            if (website_value) {
                html_content = html_content + '<p style="margin-top: 15px;"><a href="' + website_value + '" target="_blank" class="pull-right button-dark"> Website</a></p>';
            }

            html_content = html_content + '</div>' + '</li>';

            $ul_container.append(html_content);
        }
    },
    /*
     * Execute events if needed
     */
    events: function events() {

        return this;
    }
};

jQuery(document).ready(function () {
    Iecs.initialize();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjA2YmEwOTZhNDFiZjhmMTU2NWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9uaW5laGVhbHRoLWllYy1saXN0LmpzIl0sIm5hbWVzIjpbIkllY3MiLCJvcHRpb25zIiwiZGl2X2NvbnRhaW5lciIsInVybF9kYXRhIiwiaW5pdGlhbGl6ZSIsInNldFZhcnMiLCJidWlsZCIsImV2ZW50cyIsIiRkaXZfY29udGFpbmVyIiwiJCIsIiRfc2VsZiIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkb25lIiwiZGF0YSIsImllY0xpc3RDb21wb25lbnQiLCJmYWlsIiwiYXBwZW5kIiwianNvbl9kYXRhIiwiJHVsX2NvbnRhaW5lciIsImZpbmQiLCJpIiwibWF4X2NvdW50IiwibGVuZ3RoIiwid2Vic2l0ZV92YWx1ZSIsIndlYnNpdGUiLCJodG1sX2NvbnRlbnQiLCJpZCIsIm5hbWUiLCJwdXJwb3NlIiwialF1ZXJ5IiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7OztBQUtBLElBQUlBLE9BQU87O0FBRVA7OztBQUdBQyxhQUFTO0FBQ0w7QUFDQUMsdUJBQWUsV0FGVjs7QUFJTDtBQUNBQyxrQkFBVTs7QUFMTCxLQUxGOztBQWNQQyxnQkFBWSxzQkFBVztBQUNuQixhQUNLQyxPQURMLEdBRUtDLEtBRkwsR0FHS0MsTUFITDtBQUlILEtBbkJNOztBQXFCUDs7O0FBR0FGLGFBQVMsbUJBQVc7QUFDaEIsYUFBS0csY0FBTCxHQUFzQkMsRUFBRSxLQUFLUixPQUFMLENBQWFDLGFBQWYsQ0FBdEI7O0FBRUEsYUFBS0MsUUFBTCxHQUFnQixLQUFLRixPQUFMLENBQWFFLFFBQTdCOztBQUVBLGVBQU8sSUFBUDtBQUNILEtBOUJNO0FBK0JQOzs7QUFHQUcsV0FBTyxpQkFBVztBQUNkLFlBQUlJLFNBQVMsSUFBYjs7QUFFQUQsVUFBRUUsSUFBRixDQUFPO0FBQ0NDLGlCQUFLRixPQUFPUCxRQURiO0FBRUNVLGtCQUFNLEtBRlA7QUFHQ0Msc0JBQVU7O0FBSFgsU0FBUDtBQU1JO0FBTkosU0FPS0MsSUFQTCxDQU9VLFVBQVNDLElBQVQsRUFBZTs7QUFFakJOLG1CQUFPTyxnQkFBUCxDQUF3QkQsSUFBeEI7QUFHSCxTQVpMLEVBYUtFLElBYkwsQ0FhVSxZQUFXO0FBQ2JSLG1CQUFPRixjQUFQLENBQXNCVyxNQUF0QixDQUE2QixtQ0FBN0I7QUFDSCxTQWZMOztBQWtCQSxlQUFPLElBQVA7QUFDSCxLQXhETTtBQXlEUDs7O0FBR0FGLHNCQUFrQiwwQkFBVUcsU0FBVixFQUFxQjs7QUFFbkM7O0FBRUEsWUFBSUMsZ0JBQWdCLEtBQUtiLGNBQUwsQ0FBb0JjLElBQXBCLENBQXlCLElBQXpCLENBQXBCO0FBQ0EsWUFBSUMsSUFBSSxDQUFSO0FBQ0EsWUFBSUMsWUFBWUosVUFBVUssTUFBMUI7O0FBRUEsYUFBSUYsSUFBSSxDQUFSLEVBQVdBLElBQUlDLFNBQWYsRUFBMEJELEdBQTFCLEVBQThCO0FBQzFCLGdCQUFJRyxnQkFBZ0JOLFVBQVVHLENBQVYsRUFBYUksT0FBakM7O0FBRUEsZ0JBQUlDLGVBQWUsdUNBQ2IsZ0JBRGEsR0FDTVIsVUFBVUcsQ0FBVixFQUFhTSxFQURuQixHQUN3QixnQ0FEeEIsR0FDMkRULFVBQVVHLENBQVYsRUFBYU8sSUFEeEUsR0FDK0UsTUFEL0UsR0FFYiwrQkFGYSxHQUVxQlYsVUFBVUcsQ0FBVixFQUFhTSxFQUZsQyxHQUV3QyxJQUZ4QyxHQUUrQ1QsVUFBVUcsQ0FBVixFQUFhUSxPQUYvRTs7QUFLQSxnQkFBR0wsYUFBSCxFQUFpQjtBQUNiRSwrQkFBZUEsZUFBZSx3Q0FBZixHQUEwREYsYUFBMUQsR0FBMEUsbUVBQXpGO0FBQ0g7O0FBRURFLDJCQUFlQSxlQUNHLFFBREgsR0FFRyxPQUZsQjs7QUFJQVAsMEJBQWNGLE1BQWQsQ0FBcUJTLFlBQXJCO0FBRUg7QUFDSixLQXZGTTtBQXdGUDs7O0FBR0FyQixZQUFRLGtCQUFXOztBQUVmLGVBQU8sSUFBUDtBQUNIO0FBOUZNLENBQVg7O0FBa0dBeUIsT0FBT0MsUUFBUCxFQUFpQkMsS0FBakIsQ0FBd0IsWUFBVTtBQUM5QmxDLFNBQUtJLFVBQUw7QUFDSCxDQUZELEUiLCJmaWxlIjoibmluZWhlYWx0aC1pZWMtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMDZiYTA5NmE0MWJmOGYxNTY1ZSIsIi8qKlxuICogbmluZWhlYWx0aC1pZWMtbGlzdC5qc1xuICogSGVscCBwdWxsIHVwIHRoZSBsaXN0IG9mIElFQ3MgZnJvbSBhcGkgL2hlYWx0aC1mYWlyL2FqYXgvZ2V0X2llY3MgYW5kIGRpc3BsYXkgb24gdGhlIHBhZ2VcbiAqL1xuXG52YXIgSWVjcyA9IHtcblxuICAgIC8qXG4gICAgICogSW5wdXQgdmFsdWUgdG8gaW5pdGlhbGl6ZSBjb21wb25lbnRcbiAgICAgKi9cbiAgICBvcHRpb25zOiB7XG4gICAgICAgIC8vY29tcG9uZW50IGNvbnRhaW5lclxuICAgICAgICBkaXZfY29udGFpbmVyOiAnLmllYy1saXN0JyxcblxuICAgICAgICAvL3RoZSBhcGkgbGluayB0byBwdWxsIGpzb24gZGF0YVxuICAgICAgICB1cmxfZGF0YTogJy9oZWFsdGgtZmFpcnMvYWpheC9nZXQtaWVjcycsXG5cbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXNcbiAgICAgICAgICAgIC5zZXRWYXJzKClcbiAgICAgICAgICAgIC5idWlsZCgpXG4gICAgICAgICAgICAuZXZlbnRzKCk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHZhbHVlIGZvciBwcm9wZXJ0aWVzIG9mIHRoaXMgY29tcG9uZW50XG4gICAgICovXG4gICAgc2V0VmFyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGRpdl9jb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5kaXZfY29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLnVybF9kYXRhID0gdGhpcy5vcHRpb25zLnVybF9kYXRhO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBQcmVwYXJlIGRhdGEgZm9yIHRoaXMgY29tcG9uZW50XG4gICAgICovXG4gICAgYnVpbGQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJF9zZWxmID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJF9zZWxmLnVybF9kYXRhLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBSdW4gdGhpcyBpZiB0aGUgcmVxdWVzdCBzdWNjZWVkc1xuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgJF9zZWxmLmllY0xpc3RDb21wb25lbnQoZGF0YSk7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRfc2VsZi4kZGl2X2NvbnRhaW5lci5hcHBlbmQoXCI8cD5UaGVyZSBpcyBubyBJRUMgdG8gZGlzcGxheTwvcD5cIik7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBGaW5kIGFuIHVsIHRhZyBpbiB0aGlzIGNvbXBvbmVudCBhbmQgYXBwZW5kIGpzb24gZGF0YSB0byBpdFxuICAgICAqL1xuICAgIGllY0xpc3RDb21wb25lbnQ6IGZ1bmN0aW9uIChqc29uX2RhdGEpIHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKGpzb25fZGF0YSk7XG5cbiAgICAgICAgdmFyICR1bF9jb250YWluZXIgPSB0aGlzLiRkaXZfY29udGFpbmVyLmZpbmQoXCJ1bFwiKTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbWF4X2NvdW50ID0ganNvbl9kYXRhLmxlbmd0aDtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBtYXhfY291bnQ7IGkrKyl7XG4gICAgICAgICAgICB2YXIgd2Vic2l0ZV92YWx1ZSA9IGpzb25fZGF0YVtpXS53ZWJzaXRlO1xuXG4gICAgICAgICAgICB2YXIgaHRtbF9jb250ZW50ID0gJzxsaSBjbGFzcz1cImFjY29yZGlvbi1uYXZpZ2F0aW9uXCIgPidcbiAgICAgICAgICAgICAgICArICc8YSBocmVmPVwiI2llY18nICsganNvbl9kYXRhW2ldLmlkICsgJ1wiIGNsYXNzPVwiYmItYWNjb3JkaW9uLXRpdGxlXCI+ICcgKyBqc29uX2RhdGFbaV0ubmFtZSArICc8L2E+J1xuICAgICAgICAgICAgICAgICsgJzxkaXYgY2xhc3M9XCJjb250ZW50XCIgaWQ9XCJpZWNfJyArIGpzb25fZGF0YVtpXS5pZCArICAnXCI+JyArIGpzb25fZGF0YVtpXS5wdXJwb3NlO1xuXG5cbiAgICAgICAgICAgIGlmKHdlYnNpdGVfdmFsdWUpe1xuICAgICAgICAgICAgICAgIGh0bWxfY29udGVudCA9IGh0bWxfY29udGVudCArICc8cCBzdHlsZT1cIm1hcmdpbi10b3A6IDE1cHg7XCI+PGEgaHJlZj1cIicgKyB3ZWJzaXRlX3ZhbHVlICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwicHVsbC1yaWdodCBidXR0b24tZGFya1wiPiBXZWJzaXRlPC9hPjwvcD4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sX2NvbnRlbnQgPSBodG1sX2NvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArICc8L2Rpdj4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnPC9saT4nO1xuXG4gICAgICAgICAgICAkdWxfY29udGFpbmVyLmFwcGVuZChodG1sX2NvbnRlbnQpO1xuXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qXG4gICAgICogRXhlY3V0ZSBldmVudHMgaWYgbmVlZGVkXG4gICAgICovXG4gICAgZXZlbnRzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeSAoZnVuY3Rpb24oKXtcbiAgICBJZWNzLmluaXRpYWxpemUoKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2V0cy9qcy9uaW5laGVhbHRoLWllYy1saXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==