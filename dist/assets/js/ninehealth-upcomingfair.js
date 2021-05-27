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
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ({

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56);


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * ninehealth-upcomingfair.js
 * Help pull up the upcoming fairs from api /health-fair/ajax/upcomingfairs and display on the page
 */

var UpcomingFairs = {

    /*
     * Input value to initialize component
     */
    options: {
        //component container
        div_container: '.upcoming',

        //number of fair to display
        number_fair_display: 2,

        //prefix link for link button
        fair_link_prefix: '/health-fairs/fair-detail/',

        //the api link to pull json data
        url_data: '/health-fairs/ajax/upcomingfairs'

    },

    initialize: function initialize() {
        this.setVars().build().events();
    },

    /*
     * Set value for properties of this component
     */
    setVars: function setVars() {
        this.$div_container = $(this.options.div_container);
        this.number_fair_display = this.options.number_fair_display;
        this.fair_link_prefix = this.options.fair_link_prefix;

        this.url_data = this.options.url_data;

        return this;
    },
    /*
     * Prepare data to for this component
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
            if ($_self.upComingFairComponent && data) {
                $_self.upComingFairComponent(data);
            }
        }).fail(function () {
            $_self.$div_container.append("<p>There is no upcoming fair to display</p>");
        });

        return this;
    },
    /*
     * Find an ul tag in this component and append json data to it
     */
    upComingFairComponent: function upComingFairComponent(json_data) {

        var $ul_container = this.$div_container.find("ul");
        var i = 0;
        var max_count = json_data.length;
        do {
            if (i <= max_count) {
                var temp_date = json_data[i].fair_date_confirmed_start.split('-');
                var formated_date_start = temp_date[1] + '/' + temp_date[2] + '/' + temp_date[0];

                var temp_time = json_data[i].fair_time_confirmed_start.split(':');
                var formated_start_time = temp_time[0] + ':' + temp_time[1];

                temp_time = json_data[i].fair_time_confirmed_end.split(':');
                var formated_end_time = temp_time[0] + ':' + temp_time[1];

                temp_date = json_data[i].fair_date_confirmed_end.split('-');
                var formated_date_end = temp_date[1] + '/' + temp_date[2] + '/' + temp_date[0];

                //console.log(temp_date);

                $ul_container.append("<li class='row'>" + "<div class='large-9 medium-9 columns'><h5>" + json_data[i].name + "</h5>" + "<p>" + json_data[i].fair_address + ", " + json_data[i].fair_city + ", " + json_data[i].fair_zip + "<br/>" + "Start: " + formated_date_start + " at " + formated_start_time + "<br/> " + "End: " + formated_date_end + " at " + formated_end_time + "</p>" + "</div>" + "<div class='large-3 medium-3 columns'><a style='position:relative; margin-top: 25px;' href=" + this.fair_link_prefix + json_data[i].id + ">attend</a></div>");
            }

            i++;
        } while (i <= this.number_fair_display);
    },
    /*
     * Execute events if needed
     */
    events: function events() {

        return this;
    }
};

$(document).ready(function () {
    UpcomingFairs.initialize();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjA2YmEwOTZhNDFiZjhmMTU2NWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9qcy9uaW5laGVhbHRoLXVwY29taW5nZmFpci5qcyJdLCJuYW1lcyI6WyJVcGNvbWluZ0ZhaXJzIiwib3B0aW9ucyIsImRpdl9jb250YWluZXIiLCJudW1iZXJfZmFpcl9kaXNwbGF5IiwiZmFpcl9saW5rX3ByZWZpeCIsInVybF9kYXRhIiwiaW5pdGlhbGl6ZSIsInNldFZhcnMiLCJidWlsZCIsImV2ZW50cyIsIiRkaXZfY29udGFpbmVyIiwiJCIsIiRfc2VsZiIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkb25lIiwiZGF0YSIsInVwQ29taW5nRmFpckNvbXBvbmVudCIsImZhaWwiLCJhcHBlbmQiLCJqc29uX2RhdGEiLCIkdWxfY29udGFpbmVyIiwiZmluZCIsImkiLCJtYXhfY291bnQiLCJsZW5ndGgiLCJ0ZW1wX2RhdGUiLCJmYWlyX2RhdGVfY29uZmlybWVkX3N0YXJ0Iiwic3BsaXQiLCJmb3JtYXRlZF9kYXRlX3N0YXJ0IiwidGVtcF90aW1lIiwiZmFpcl90aW1lX2NvbmZpcm1lZF9zdGFydCIsImZvcm1hdGVkX3N0YXJ0X3RpbWUiLCJmYWlyX3RpbWVfY29uZmlybWVkX2VuZCIsImZvcm1hdGVkX2VuZF90aW1lIiwiZmFpcl9kYXRlX2NvbmZpcm1lZF9lbmQiLCJmb3JtYXRlZF9kYXRlX2VuZCIsIm5hbWUiLCJmYWlyX2FkZHJlc3MiLCJmYWlyX2NpdHkiLCJmYWlyX3ppcCIsImlkIiwiZG9jdW1lbnQiLCJyZWFkeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUEwQ0EsVUFBVSxDQUFWLENBQWxFOztBQUVBOztBQUVBTCw4QkFBY0YsTUFBZCxDQUFxQixxQkFDZiw0Q0FEZSxHQUNnQ0MsVUFBVUcsQ0FBVixFQUFhYyxJQUQ3QyxHQUNvRCxPQURwRCxHQUVmLEtBRmUsR0FFUGpCLFVBQVVHLENBQVYsRUFBYWUsWUFGTixHQUVxQixJQUZyQixHQUU0QmxCLFVBQVVHLENBQVYsRUFBYWdCLFNBRnpDLEdBRXFELElBRnJELEdBRTREbkIsVUFBVUcsQ0FBVixFQUFhaUIsUUFGekUsR0FFb0YsT0FGcEYsR0FHZixTQUhlLEdBR0hYLG1CQUhHLEdBR21CLE1BSG5CLEdBRzRCRyxtQkFINUIsR0FHa0QsUUFIbEQsR0FJZixPQUplLEdBSUxJLGlCQUpLLEdBSWUsTUFKZixHQUl3QkYsaUJBSnhCLEdBS2YsTUFMZSxHQU1oQixRQU5nQixHQU9mLDZGQVBlLEdBT2lGLEtBQUtoQyxnQkFQdEYsR0FPeUdrQixVQUFVRyxDQUFWLEVBQWFrQixFQVB0SCxHQU8ySCxtQkFQaEo7QUFXSDs7QUFFRGxCO0FBQ0gsU0E5QkQsUUE4QlNBLEtBQUssS0FBS3RCLG1CQTlCbkI7QUFpQ0gsS0ExR2U7QUEyR2hCOzs7QUFHQU0sWUFBUSxrQkFBVzs7QUFFZixlQUFPLElBQVA7QUFDSDtBQWpIZSxDQUFwQjs7QUFxSEFFLEVBQUVpQyxRQUFGLEVBQVlDLEtBQVosQ0FBbUIsWUFBVTtBQUN6QjdDLGtCQUFjTSxVQUFkO0FBQ0gsQ0FGRCxFIiwiZmlsZSI6Im5pbmVoZWFsdGgtdXBjb21pbmdmYWlyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNTUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIwNmJhMDk2YTQxYmY4ZjE1NjVlIiwiLyoqXG4gKiBuaW5laGVhbHRoLXVwY29taW5nZmFpci5qc1xuICogSGVscCBwdWxsIHVwIHRoZSB1cGNvbWluZyBmYWlycyBmcm9tIGFwaSAvaGVhbHRoLWZhaXIvYWpheC91cGNvbWluZ2ZhaXJzIGFuZCBkaXNwbGF5IG9uIHRoZSBwYWdlXG4gKi9cblxudmFyIFVwY29taW5nRmFpcnMgPSB7XG5cbiAgICAvKlxuICAgICAqIElucHV0IHZhbHVlIHRvIGluaXRpYWxpemUgY29tcG9uZW50XG4gICAgICovXG4gICAgb3B0aW9uczoge1xuICAgICAgICAvL2NvbXBvbmVudCBjb250YWluZXJcbiAgICAgICAgZGl2X2NvbnRhaW5lcjogJy51cGNvbWluZycsXG5cbiAgICAgICAgLy9udW1iZXIgb2YgZmFpciB0byBkaXNwbGF5XG4gICAgICAgIG51bWJlcl9mYWlyX2Rpc3BsYXk6IDIsXG5cbiAgICAgICAgLy9wcmVmaXggbGluayBmb3IgbGluayBidXR0b25cbiAgICAgICAgZmFpcl9saW5rX3ByZWZpeDogJy9oZWFsdGgtZmFpcnMvZmFpci1kZXRhaWwvJyxcblxuICAgICAgICAvL3RoZSBhcGkgbGluayB0byBwdWxsIGpzb24gZGF0YVxuICAgICAgICB1cmxfZGF0YTogJy9oZWFsdGgtZmFpcnMvYWpheC91cGNvbWluZ2ZhaXJzJyxcblxuICAgIH0sXG5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpc1xuICAgICAgICAgICAgLnNldFZhcnMoKVxuICAgICAgICAgICAgLmJ1aWxkKClcbiAgICAgICAgICAgIC5ldmVudHMoKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgdmFsdWUgZm9yIHByb3BlcnRpZXMgb2YgdGhpcyBjb21wb25lbnRcbiAgICAgKi9cbiAgICBzZXRWYXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kZGl2X2NvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLmRpdl9jb250YWluZXIpO1xuICAgICAgICB0aGlzLm51bWJlcl9mYWlyX2Rpc3BsYXkgPSB0aGlzLm9wdGlvbnMubnVtYmVyX2ZhaXJfZGlzcGxheTtcbiAgICAgICAgdGhpcy5mYWlyX2xpbmtfcHJlZml4ID0gdGhpcy5vcHRpb25zLmZhaXJfbGlua19wcmVmaXg7XG5cbiAgICAgICAgdGhpcy51cmxfZGF0YSA9IHRoaXMub3B0aW9ucy51cmxfZGF0YTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIC8qXG4gICAgICogUHJlcGFyZSBkYXRhIHRvIGZvciB0aGlzIGNvbXBvbmVudFxuICAgICAqL1xuICAgIGJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyICRfc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJF9zZWxmLnVybF9kYXRhLFxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuXG5cbiAgICAgICAgfSlcbiAgICAgICAgLy8gUnVuIHRoaXMgaWYgdGhlIHJlcXVlc3Qgc3VjY2VlZHNcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoJF9zZWxmLnVwQ29taW5nRmFpckNvbXBvbmVudCAmJiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAkX3NlbGYudXBDb21pbmdGYWlyQ29tcG9uZW50KGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkX3NlbGYuJGRpdl9jb250YWluZXIuYXBwZW5kKFwiPHA+VGhlcmUgaXMgbm8gdXBjb21pbmcgZmFpciB0byBkaXNwbGF5PC9wPlwiKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAvKlxuICAgICAqIEZpbmQgYW4gdWwgdGFnIGluIHRoaXMgY29tcG9uZW50IGFuZCBhcHBlbmQganNvbiBkYXRhIHRvIGl0XG4gICAgICovXG4gICAgdXBDb21pbmdGYWlyQ29tcG9uZW50OiBmdW5jdGlvbiAoanNvbl9kYXRhKSB7XG5cbiAgICAgICAgdmFyICR1bF9jb250YWluZXIgPSB0aGlzLiRkaXZfY29udGFpbmVyLmZpbmQoXCJ1bFwiKTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgbWF4X2NvdW50ID0ganNvbl9kYXRhLmxlbmd0aDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKGkgPD0gbWF4X2NvdW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBfZGF0ZSA9IChqc29uX2RhdGFbaV0uZmFpcl9kYXRlX2NvbmZpcm1lZF9zdGFydCkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0ZWRfZGF0ZV9zdGFydCA9IHRlbXBfZGF0ZVsxXSArICcvJyArIHRlbXBfZGF0ZVsyXSArICcvJyArIHRlbXBfZGF0ZVswXTtcblxuICAgICAgICAgICAgICAgIHZhciB0ZW1wX3RpbWUgPSAoanNvbl9kYXRhW2ldLmZhaXJfdGltZV9jb25maXJtZWRfc3RhcnQpLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdGVkX3N0YXJ0X3RpbWUgPSB0ZW1wX3RpbWVbMF0gKyAnOicgKyB0ZW1wX3RpbWVbMV07XG5cbiAgICAgICAgICAgICAgICB0ZW1wX3RpbWUgPSAoanNvbl9kYXRhW2ldLmZhaXJfdGltZV9jb25maXJtZWRfZW5kKS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgICAgIHZhciBmb3JtYXRlZF9lbmRfdGltZSA9IHRlbXBfdGltZVswXSArICc6JyArIHRlbXBfdGltZVsxXTtcblxuICAgICAgICAgICAgICAgIHRlbXBfZGF0ZSA9IChqc29uX2RhdGFbaV0uZmFpcl9kYXRlX2NvbmZpcm1lZF9lbmQpLnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdGVkX2RhdGVfZW5kID0gdGVtcF9kYXRlWzFdICsgJy8nICsgdGVtcF9kYXRlWzJdICsgJy8nICsgdGVtcF9kYXRlWzBdO1xuXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0ZW1wX2RhdGUpO1xuXG4gICAgICAgICAgICAgICAgJHVsX2NvbnRhaW5lci5hcHBlbmQoXCI8bGkgY2xhc3M9J3Jvdyc+XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIjxkaXYgY2xhc3M9J2xhcmdlLTkgbWVkaXVtLTkgY29sdW1ucyc+PGg1PlwiICsganNvbl9kYXRhW2ldLm5hbWUgKyBcIjwvaDU+XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIjxwPlwiICsganNvbl9kYXRhW2ldLmZhaXJfYWRkcmVzcyArIFwiLCBcIiArIGpzb25fZGF0YVtpXS5mYWlyX2NpdHkgKyBcIiwgXCIgKyBqc29uX2RhdGFbaV0uZmFpcl96aXAgKyBcIjxici8+XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIlN0YXJ0OiBcIiArIGZvcm1hdGVkX2RhdGVfc3RhcnQgKyBcIiBhdCBcIiArIGZvcm1hdGVkX3N0YXJ0X3RpbWUgKyBcIjxici8+IFwiXG4gICAgICAgICAgICAgICAgICAgICsgXCJFbmQ6IFwiICsgZm9ybWF0ZWRfZGF0ZV9lbmQgKyBcIiBhdCBcIiArIGZvcm1hdGVkX2VuZF90aW1lXG4gICAgICAgICAgICAgICAgICAgICsgXCI8L3A+XCJcbiAgICAgICAgICAgICAgICAgICAgK1wiPC9kaXY+XCJcbiAgICAgICAgICAgICAgICAgICAgKyBcIjxkaXYgY2xhc3M9J2xhcmdlLTMgbWVkaXVtLTMgY29sdW1ucyc+PGEgc3R5bGU9J3Bvc2l0aW9uOnJlbGF0aXZlOyBtYXJnaW4tdG9wOiAyNXB4OycgaHJlZj1cIiArIHRoaXMuZmFpcl9saW5rX3ByZWZpeCArIGpzb25fZGF0YVtpXS5pZCArIFwiPmF0dGVuZDwvYT48L2Rpdj5cIlxuXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0gd2hpbGUgKGkgPD0gdGhpcy5udW1iZXJfZmFpcl9kaXNwbGF5KTtcblxuXG4gICAgfSxcbiAgICAvKlxuICAgICAqIEV4ZWN1dGUgZXZlbnRzIGlmIG5lZWRlZFxuICAgICAqL1xuICAgIGV2ZW50czogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuXG5cbiQoZG9jdW1lbnQpLnJlYWR5IChmdW5jdGlvbigpe1xuICAgIFVwY29taW5nRmFpcnMuaW5pdGlhbGl6ZSgpO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzL2pzL25pbmVoZWFsdGgtdXBjb21pbmdmYWlyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==