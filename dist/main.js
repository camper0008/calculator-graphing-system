/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/calculator.ts":
/*!***************************!*\
  !*** ./src/calculator.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculator": () => (/* binding */ calculator)
/* harmony export */ });
var calculator = function () {
    throw new Error('fsdfds');
    var resultHolder = $('#result');
    var result = $('#result text');
    var formulaList = $('#formulaList');
    var formulaVarInput = $('#formulaVarInput');
    var func;
    var equation = '';
    var isAltMode = false;
    $('#error').slideUp(0);
    formulaList.slideUp(0);
    var functions = {
        form: function (e) {
            if (!formulaList.is(":visible")) {
                formulaList.css('top', e.clientY + 'px');
                formulaList.css('left', e.clientX + 'px');
            }
            formulaList.slideToggle();
        },
        clearOne: function () {
            equation = equation.substr(0, equation.length - 1);
            if (equation === '') {
                result.text('0');
            }
            else {
                result.text(equation);
                resultHolder.scrollLeft(resultHolder.prop('scrollWidth'));
            }
        },
        clearAll: function () {
            equation = '';
            result.text('0');
        },
        extraOn: function () {
            isAltMode = true;
            $("div.btn[alt-text]").each(function (_, element) {
                $(element.children[0]).text($(element).attr('alt-text'));
            });
        },
        extraOff: function () {
            isAltMode = false;
            $("div.btn[alt-text]").each(function (_, element) {
                $(element.children[0]).text($(element).attr('text'));
            });
        },
        random: function () {
            var num = Math.random().toString().slice(0, 5);
            if (shouldMultiply(equation, num)) {
                equation += '×';
            }
            equation += num;
            result.text(equation);
            resultHolder.scrollLeft(resultHolder.prop('scrollWidth'));
        },
        graph: function () {
            window.open(window.location.pathname.replace('index.html', 'graphing.html?stdgraph=' + functions.answer(true)));
        },
        answer: function (grabEquation) {
            var fEq = equation;
            fEq = fEq.replace(/\÷/g, '/');
            fEq = fEq.replace(/\×/g, '*');
            fEq = fEq.replace(/log/g, 'Math.log');
            fEq = fEq.replace(/sin/g, '(180/pi)*Math.sin');
            fEq = fEq.replace(/cos/g, '(180/pi)*Math.cos');
            fEq = fEq.replace(/tan/g, '(180/pi)*Math.tan');
            fEq = fEq.replace(/sin\^\-1/g, 'asin');
            fEq = fEq.replace(/cos\^\-1/g, 'acos');
            fEq = fEq.replace(/tan\^\-1/g, 'atan');
            fEq = fEq.replace(/pi/g, 'Math.PI');
            fEq = fEq.replace(/e/g, 'Math.exp(1)');
            fEq = fEq.replace(/√/g, 'Math.sqrt');
            fEq = fEq.replace(/%/g, '/100');
            fEq = fEq.replace(/\^/g, '**');
            if (grabEquation === true)
                return fEq;
            try {
                func = (fEq) ? new Function('return ' + fEq) : new Function('return 0');
                ;
                equation = func().toString();
                $('#error').slideUp();
            }
            catch (err) {
                if (err.toString().match('x is not defined'))
                    err += '; it is only used in graphing';
                $('#error').text(err);
                $('#error').slideDown();
            }
            result.text(equation);
            resultHolder.scrollLeft(resultHolder.prop('scrollWidth'));
        },
        writeFormula: function (e) {
            var formula = $(e.target).attr('formula') || '';
            var varToReplace = formulaVarInput.prop('value') || '';
            if (varToReplace !== '') {
                varToReplace = varToReplace.replace(/\"\'/g, "");
                varToReplace = varToReplace.replace(/\=/g, ':');
                varToReplace = varToReplace.replace(/\;/g, ',');
                varToReplace = varToReplace.replace(/([^\:\,]+)\:([^\,]+)/g, '\"$1\":"$2"');
                if (varToReplace.slice(-1) === ',')
                    varToReplace = varToReplace.slice(0, -1);
                varToReplace = '{' + varToReplace + '}';
                var object = JSON.parse(varToReplace);
                for (var key in object) {
                    var regex = new RegExp(key, 'g');
                    formula = formula.replace(regex, object[key]);
                }
            }
            if (!equation.slice(-1).match(/[\+\-\÷\×\^]/) && equation !== '') {
                equation += '×';
            }
            equation += formula;
            result.text(equation);
            resultHolder.scrollLeft(resultHolder.prop('scrollWidth'));
        }
    };
    document.onkeydown = function (e) { if (e.key === "Shift")
        functions.extraOn(); };
    document.onkeyup = function (e) { if (e.key === "Shift")
        functions.extraOff(); };
    var shouldMultiply = function (eq, write) {
        if (eq === '')
            return false;
        if (write.match(/\./g) && eq.match(/\d?\.\d+$/))
            return true;
        if (write === ')')
            return false;
        if (eq.slice(-1).match(/[\+\-\÷\×\^]/) || write.match(/[\%\+\-\÷\×\^]/))
            return false;
        if (eq.slice(-1) === '.' || write === '.')
            return false;
        if (eq.slice(-1) === '(')
            return false;
        if (eq.slice(-1) === ')' && write === ')')
            return false;
        if (eq.slice(-1).match(/[0-9]/) && write.match(/[0-9]/))
            return false;
        return true;
    };
    $("div.btn").click(function (event) {
        if ($(event.target).attr('use') != 'form' && $(event.target).attr('alt-use') != 'form') {
            formulaList.slideUp();
        }
        ;
        var element = $(event.target);
        var use = element.attr('use');
        var altUse = element.attr('alt-use');
        if (isAltMode && element.attr('alt-write')) {
            if (shouldMultiply(equation, element.attr('alt-write'))) {
                equation += '×';
            }
            equation += element.attr('alt-write');
            result.text(equation);
            resultHolder.scrollLeft(resultHolder.prop('scrollWidth'));
        }
        else if (element.attr('write')) {
            if (shouldMultiply(equation, element.attr('write'))) {
                equation += '×';
            }
            equation += element.attr('write');
            result.text(equation);
            resultHolder.scrollLeft(resultHolder.prop('scrollWidth'));
        }
        else if (isAltMode && element.attr('alt-use') && functions[element.attr('alt-use')]) {
            functions[element.attr('alt-use')](event);
        }
        else if (element.attr('use') && functions[element.attr('use')]) {
            functions[element.attr('use')](event);
        }
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator */ "./src/calculator.ts");

var main = function () {
    var page = window.location.pathname.split('/').pop();
    switch (page) {
        case 'calculator.html': {
            (0,_calculator__WEBPACK_IMPORTED_MODULE_0__.calculator)();
            break;
        }
        case 'graphing.html': {
            break;
        }
        default: {
            throw new Error('File not found!');
        }
    }
};
main();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYWxjdWxhdG9yLWdyYXBoaW5nLXN5c3RlbS8uL3NyYy9jYWxjdWxhdG9yLnRzIiwid2VicGFjazovL2NhbGN1bGF0b3ItZ3JhcGhpbmctc3lzdGVtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhbGN1bGF0b3ItZ3JhcGhpbmctc3lzdGVtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYWxjdWxhdG9yLWdyYXBoaW5nLXN5c3RlbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhbGN1bGF0b3ItZ3JhcGhpbmctc3lzdGVtL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2FsY3VsYXRvci1ncmFwaGluZy1zeXN0ZW0vLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNLFVBQVUsR0FBRztJQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQztJQUV6QixJQUFNLFlBQVksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pDLElBQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUM7SUFDckMsSUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO0lBQzdDLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUV0QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkIsSUFBTSxTQUFTLEdBQUc7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QUVELElBQUksRUFBRSxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmV4cG9ydCBjb25zdCBjYWxjdWxhdG9yID0gKCkgPT4ge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdmc2RmZHMnKVxyXG4gICAgXHJcbiAgICBjb25zdCByZXN1bHRIb2xkZXIgPSAkKCcjcmVzdWx0Jyk7XHJcbmNvbnN0IHJlc3VsdCA9ICQoJyNyZXN1bHQgdGV4dCcpO1xyXG5jb25zdCBmb3JtdWxhTGlzdCA9ICQoJyNmb3JtdWxhTGlzdCcpXHJcbmNvbnN0IGZvcm11bGFWYXJJbnB1dCA9ICQoJyNmb3JtdWxhVmFySW5wdXQnKVxyXG5sZXQgZnVuYztcclxubGV0IGVxdWF0aW9uID0gJyc7XHJcbmxldCBpc0FsdE1vZGUgPSBmYWxzZTtcclxuXHJcbiQoJyNlcnJvcicpLnNsaWRlVXAoMCk7XHJcbmZvcm11bGFMaXN0LnNsaWRlVXAoMCk7XHJcblxyXG5jb25zdCBmdW5jdGlvbnMgPSB7XHJcbiAgICBmb3JtOiAoZTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKCFmb3JtdWxhTGlzdC5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcbiAgICAgICAgICAgIGZvcm11bGFMaXN0LmNzcygndG9wJywgZS5jbGllbnRZICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGZvcm11bGFMaXN0LmNzcygnbGVmdCcsIGUuY2xpZW50WCArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JtdWxhTGlzdC5zbGlkZVRvZ2dsZSgpO1xyXG4gICAgfSxcclxuICAgIGNsZWFyT25lOiAoKSA9PiB7XHJcbiAgICAgICAgZXF1YXRpb24gPSBlcXVhdGlvbi5zdWJzdHIoMCwgZXF1YXRpb24ubGVuZ3RoIC0gMSlcclxuICAgICAgICBpZiAoZXF1YXRpb24gPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0KCcwJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0LnRleHQoZXF1YXRpb24pO1xyXG4gICAgICAgICAgICByZXN1bHRIb2xkZXIuc2Nyb2xsTGVmdChyZXN1bHRIb2xkZXIucHJvcCgnc2Nyb2xsV2lkdGgnKSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xlYXJBbGw6ICgpID0+IHtcclxuICAgICAgICBlcXVhdGlvbiA9ICcnO1xyXG4gICAgICAgIHJlc3VsdC50ZXh0KCcwJyk7XHJcbiAgICB9LFxyXG4gICAgZXh0cmFPbjogKCkgPT4ge1xyXG4gICAgICAgIGlzQWx0TW9kZSA9IHRydWU7XHJcbiAgICAgICAgJChcImRpdi5idG5bYWx0LXRleHRdXCIpLmVhY2goKF8sIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgJChlbGVtZW50LmNoaWxkcmVuWzBdKS50ZXh0KDxzdHJpbmc+JChlbGVtZW50KS5hdHRyKCdhbHQtdGV4dCcpKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZXh0cmFPZmY6ICgpID0+IHtcclxuICAgICAgICBpc0FsdE1vZGUgPSBmYWxzZTtcclxuICAgICAgICAkKFwiZGl2LmJ0blthbHQtdGV4dF1cIikuZWFjaCgoXywgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAkKGVsZW1lbnQuY2hpbGRyZW5bMF0pLnRleHQoPHN0cmluZz4kKGVsZW1lbnQpLmF0dHIoJ3RleHQnKSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJhbmRvbTogKCkgPT4ge1xyXG4gICAgICAgIGxldCBudW0gPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc2xpY2UoMCwgNSk7XHJcbiAgICAgICAgaWYgKHNob3VsZE11bHRpcGx5KGVxdWF0aW9uLCBudW0pKSB7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uICs9ICfDlyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVxdWF0aW9uICs9IG51bVxyXG4gICAgICAgIHJlc3VsdC50ZXh0KGVxdWF0aW9uKTtcclxuICAgICAgICByZXN1bHRIb2xkZXIuc2Nyb2xsTGVmdChyZXN1bHRIb2xkZXIucHJvcCgnc2Nyb2xsV2lkdGgnKSlcclxuICAgIH0sXHJcbiAgICBncmFwaDogKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKCdpbmRleC5odG1sJywgJ2dyYXBoaW5nLmh0bWw/c3RkZ3JhcGg9JyArIGZ1bmN0aW9ucy5hbnN3ZXIodHJ1ZSkpKVxyXG4gICAgfSxcclxuICAgIGFuc3dlcjogKGdyYWJFcXVhdGlvbjogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIGxldCBmRXEgPSBlcXVhdGlvbjsgLy9mb3JtYXR0ZWRFcXVhdGlvblxyXG5cclxuICAgICAgICBmRXEgPSBmRXEucmVwbGFjZSgvXFzDty9nLCAnLycpXHJcbiAgICAgICAgZkVxID0gZkVxLnJlcGxhY2UoL1xcw5cvZywgJyonKVxyXG4gICAgICAgIGZFcSA9IGZFcS5yZXBsYWNlKC9sb2cvZywgJ01hdGgubG9nJylcclxuXHJcbiAgICAgICAgZkVxID0gZkVxLnJlcGxhY2UoL3Npbi9nLCAnKDE4MC9waSkqTWF0aC5zaW4nKVxyXG4gICAgICAgIGZFcSA9IGZFcS5yZXBsYWNlKC9jb3MvZywgJygxODAvcGkpKk1hdGguY29zJylcclxuICAgICAgICBmRXEgPSBmRXEucmVwbGFjZSgvdGFuL2csICcoMTgwL3BpKSpNYXRoLnRhbicpXHJcblxyXG4gICAgICAgIGZFcSA9IGZFcS5yZXBsYWNlKC9zaW5cXF5cXC0xL2csICdhc2luJylcclxuICAgICAgICBmRXEgPSBmRXEucmVwbGFjZSgvY29zXFxeXFwtMS9nLCAnYWNvcycpXHJcbiAgICAgICAgZkVxID0gZkVxLnJlcGxhY2UoL3RhblxcXlxcLTEvZywgJ2F0YW4nKVxyXG5cclxuICAgICAgICBmRXEgPSBmRXEucmVwbGFjZSgvcGkvZywgJ01hdGguUEknKVxyXG4gICAgICAgIGZFcSA9IGZFcS5yZXBsYWNlKC9lL2csICdNYXRoLmV4cCgxKScpXHJcbiAgICAgICAgZkVxID0gZkVxLnJlcGxhY2UoL+KImi9nLCAnTWF0aC5zcXJ0JylcclxuICAgICAgICBmRXEgPSBmRXEucmVwbGFjZSgvJS9nLCAnLzEwMCcpXHJcbiAgICAgICAgZkVxID0gZkVxLnJlcGxhY2UoL1xcXi9nLCAnKionKVxyXG5cclxuICAgICAgICBpZiAoZ3JhYkVxdWF0aW9uID09PSB0cnVlKSByZXR1cm4gZkVxO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmdW5jID0gKGZFcSkgPyBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgZkVxKSA6IG5ldyBGdW5jdGlvbigncmV0dXJuIDAnKTs7XHJcbiAgICAgICAgICAgIGVxdWF0aW9uID0gZnVuYygpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgJCgnI2Vycm9yJykuc2xpZGVVcCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBpZiAoZXJyLnRvU3RyaW5nKCkubWF0Y2goJ3ggaXMgbm90IGRlZmluZWQnKSkgZXJyICs9ICc7IGl0IGlzIG9ubHkgdXNlZCBpbiBncmFwaGluZyc7XHJcbiAgICAgICAgICAgICQoJyNlcnJvcicpLnRleHQoZXJyKVxyXG4gICAgICAgICAgICAkKCcjZXJyb3InKS5zbGlkZURvd24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnRleHQoZXF1YXRpb24pO1xyXG4gICAgICAgIHJlc3VsdEhvbGRlci5zY3JvbGxMZWZ0KHJlc3VsdEhvbGRlci5wcm9wKCdzY3JvbGxXaWR0aCcpKVxyXG4gICAgfSxcclxuICAgIHdyaXRlRm9ybXVsYTogKGU6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBmb3JtdWxhID0gJChlLnRhcmdldCkuYXR0cignZm9ybXVsYScpIHx8ICcnXHJcbiAgICAgICAgbGV0IHZhclRvUmVwbGFjZSA9IGZvcm11bGFWYXJJbnB1dC5wcm9wKCd2YWx1ZScpIHx8ICcnO1xyXG4gICAgICAgIGlmICh2YXJUb1JlcGxhY2UgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHZhclRvUmVwbGFjZSA9IHZhclRvUmVwbGFjZS5yZXBsYWNlKC9cXFwiXFwnL2csIFwiXCIpO1xyXG4gICAgICAgICAgICB2YXJUb1JlcGxhY2UgPSB2YXJUb1JlcGxhY2UucmVwbGFjZSgvXFw9L2csICc6Jyk7XHJcbiAgICAgICAgICAgIHZhclRvUmVwbGFjZSA9IHZhclRvUmVwbGFjZS5yZXBsYWNlKC9cXDsvZywgJywnKTtcclxuICAgICAgICAgICAgdmFyVG9SZXBsYWNlID0gdmFyVG9SZXBsYWNlLnJlcGxhY2UoLyhbXlxcOlxcLF0rKVxcOihbXlxcLF0rKS9nLCAnXFxcIiQxXFxcIjpcIiQyXCInKTtcclxuICAgICAgICAgICAgaWYgKHZhclRvUmVwbGFjZS5zbGljZSgtMSkgPT09ICcsJykgdmFyVG9SZXBsYWNlID0gdmFyVG9SZXBsYWNlLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgdmFyVG9SZXBsYWNlID0gJ3snICsgdmFyVG9SZXBsYWNlICsgJ30nO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0ID0gSlNPTi5wYXJzZSh2YXJUb1JlcGxhY2UpXHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBvYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZWdleCA9IG5ldyBSZWdFeHAoa2V5LCAnZycpXHJcbiAgICAgICAgICAgICAgICBmb3JtdWxhID0gZm9ybXVsYS5yZXBsYWNlKHJlZ2V4LCBvYmplY3Rba2V5XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVxdWF0aW9uLnNsaWNlKC0xKS5tYXRjaCgvW1xcK1xcLVxcw7dcXMOXXFxeXS8pICYmIGVxdWF0aW9uICE9PSAnJykge1xyXG4gICAgICAgICAgICBlcXVhdGlvbiArPSAnw5cnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVxdWF0aW9uICs9IGZvcm11bGFcclxuICAgICAgICByZXN1bHQudGV4dChlcXVhdGlvbik7XHJcbiAgICAgICAgcmVzdWx0SG9sZGVyLnNjcm9sbExlZnQocmVzdWx0SG9sZGVyLnByb3AoJ3Njcm9sbFdpZHRoJykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IChlKSA9PiB7IGlmIChlLmtleSA9PT0gXCJTaGlmdFwiKSBmdW5jdGlvbnMuZXh0cmFPbigpOyB9XHJcbmRvY3VtZW50Lm9ua2V5dXAgPSAoZSkgPT4geyBpZiAoZS5rZXkgPT09IFwiU2hpZnRcIikgZnVuY3Rpb25zLmV4dHJhT2ZmKCk7IH1cclxuXHJcbmxldCBzaG91bGRNdWx0aXBseSA9IChlcTogc3RyaW5nLCB3cml0ZTogc3RyaW5nKSA9PiB7XHJcblxyXG4gICAgaWYgKGVxID09PSAnJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKHdyaXRlLm1hdGNoKC9cXC4vZykgJiYgZXEubWF0Y2goL1xcZD9cXC5cXGQrJC8pKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmICh3cml0ZSA9PT0gJyknKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoZXEuc2xpY2UoLTEpLm1hdGNoKC9bXFwrXFwtXFzDt1xcw5dcXF5dLykgfHwgd3JpdGUubWF0Y2goL1tcXCVcXCtcXC1cXMO3XFzDl1xcXl0vKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGVxLnNsaWNlKC0xKSA9PT0gJy4nIHx8IHdyaXRlID09PSAnLicpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChlcS5zbGljZSgtMSkgPT09ICcoJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGVxLnNsaWNlKC0xKSA9PT0gJyknICYmIHdyaXRlID09PSAnKScpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChlcS5zbGljZSgtMSkubWF0Y2goL1swLTldLykgJiYgd3JpdGUubWF0Y2goL1swLTldLykpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbn1cclxuXHJcbiQoXCJkaXYuYnRuXCIpLmNsaWNrKChldmVudCkgPT4ge1xyXG4gICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5hdHRyKCd1c2UnKSAhPSAnZm9ybScgJiYgJChldmVudC50YXJnZXQpLmF0dHIoJ2FsdC11c2UnKSAhPSAnZm9ybScpIHtcclxuICAgICAgICBmb3JtdWxhTGlzdC5zbGlkZVVwKClcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZWxlbWVudCA9ICQoZXZlbnQudGFyZ2V0KVxyXG4gICAgXHJcbiAgICBjb25zdCB1c2UgPSBlbGVtZW50LmF0dHIoJ3VzZScpO1xyXG4gICAgY29uc3QgYWx0VXNlID0gZWxlbWVudC5hdHRyKCdhbHQtdXNlJyk7XHJcbiAgICBcclxuICAgIGlmIChpc0FsdE1vZGUgJiYgZWxlbWVudC5hdHRyKCdhbHQtd3JpdGUnKSkge1xyXG4gICAgICAgIGlmIChzaG91bGRNdWx0aXBseShlcXVhdGlvbiwgPHN0cmluZz5lbGVtZW50LmF0dHIoJ2FsdC13cml0ZScpKSkge1xyXG4gICAgICAgICAgICBlcXVhdGlvbiArPSAnw5cnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlcXVhdGlvbiArPSBlbGVtZW50LmF0dHIoJ2FsdC13cml0ZScpXHJcbiAgICAgICAgcmVzdWx0LnRleHQoZXF1YXRpb24pO1xyXG4gICAgICAgIHJlc3VsdEhvbGRlci5zY3JvbGxMZWZ0KHJlc3VsdEhvbGRlci5wcm9wKCdzY3JvbGxXaWR0aCcpKVxyXG5cclxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5hdHRyKCd3cml0ZScpKSB7XHJcbiAgICAgICAgaWYgKHNob3VsZE11bHRpcGx5KGVxdWF0aW9uLCA8c3RyaW5nPmVsZW1lbnQuYXR0cignd3JpdGUnKSkpIHtcclxuICAgICAgICAgICAgZXF1YXRpb24gKz0gJ8OXJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVxdWF0aW9uICs9IGVsZW1lbnQuYXR0cignd3JpdGUnKVxyXG4gICAgICAgIHJlc3VsdC50ZXh0KGVxdWF0aW9uKTtcclxuICAgICAgICByZXN1bHRIb2xkZXIuc2Nyb2xsTGVmdChyZXN1bHRIb2xkZXIucHJvcCgnc2Nyb2xsV2lkdGgnKSlcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICB9IGVsc2UgaWYgKGlzQWx0TW9kZSAmJiBlbGVtZW50LmF0dHIoJ2FsdC11c2UnKSAmJiBmdW5jdGlvbnNbZWxlbWVudC5hdHRyKCdhbHQtdXNlJyldKSB7XHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgIGZ1bmN0aW9uc1tlbGVtZW50LmF0dHIoJ2FsdC11c2UnKV0oZXZlbnQpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5hdHRyKCd1c2UnKSAmJiBmdW5jdGlvbnNbZWxlbWVudC5hdHRyKCd1c2UnKV0pIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgZnVuY3Rpb25zW2VsZW1lbnQuYXR0cigndXNlJyldKGV2ZW50KTtcclxuICAgIH1cclxufSk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdG9yJztcclxuXHJcbmNvbnN0IG1haW4gPSAoKSA9PiB7XHJcbiAgICBcclxuICAgIGNvbnN0IHBhZ2UgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5wb3AoKTtcclxuICAgIFxyXG4gICAgc3dpdGNoKHBhZ2UpIHtcclxuICAgICAgICBcclxuICAgICAgICBjYXNlICdjYWxjdWxhdG9yLmh0bWwnOiB7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0b3IoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNhc2UgJ2dyYXBoaW5nLmh0bWwnOiB7XHJcbiAgICAgICAgICAgIC8vIGdyYXBoaW5nLnRzXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlsZSBub3QgZm91bmQhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbm1haW4oKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==