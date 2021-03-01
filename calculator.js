const resultHolder = $('#result');
const result = $('#result text');
const formulaList = $('#formulaList')
const formulaVarInput = $('#formulaVarInput')
let func;
let equation = '';
let isAltMode = false;

$('#error').slideUp(0);
formulaList.slideUp(0);

const functions = {
    form: (e) => {
        if (!formulaList.is(":visible")) {
            formulaList.css('top', e.clientY+'px');
            formulaList.css('left', e.clientX+'px');
        }
        formulaList.slideToggle();
    },
    clearOne: () => {
        equation = equation.substr(0, equation.length-1)
        if (equation === '') {
            result.text('0');
        } else {
            result.text(equation);
            resultHolder.scrollLeft(resultHolder.prop('scrollWidth'))
        }
    },
    clearAll: () => {
        equation = '';
        result.text('0');
    },
    extraOn: () => {
        isAltMode = true;
        $("div.btn[alt-text]").each( (_, element) => {
            $(element.children[0]).text($(element).attr('alt-text'))
        })
    },
    extraOff: () => {
        isAltMode = false;
        $("div.btn[alt-text]").each( (_, element) => {
            $(element.children[0]).text($(element).attr('text'))
        })
    },
    random: () => {
        let num = Math.random().toString().slice(0,5);
        if (shouldMultiply(equation, num)) {
            equation += '×';
        }
        equation += num
        result.text(equation);
        resultHolder.scrollLeft(resultHolder.prop('scrollWidth'))
    },
    graph: () => {
        window.open(window.location.pathname.replace('index.html','graphing.html?stdgraph='+functions.answer(true)))
    },
    answer: (grabEquation) => {
        let fEq = equation; //formattedEquation

        fEq = fEq.replace(/\÷/g,'/')
        fEq = fEq.replace(/\×/g,'*')
        fEq = fEq.replace(/log/g, 'Math.log')

        fEq = fEq.replace(/sin/g, '(180/pi)*Math.sin')
        fEq = fEq.replace(/cos/g, '(180/pi)*Math.cos')
        fEq = fEq.replace(/tan/g, '(180/pi)*Math.tan')

        fEq = fEq.replace(/sin\^\-1/g, 'asin')
        fEq = fEq.replace(/cos\^\-1/g, 'acos')
        fEq = fEq.replace(/tan\^\-1/g, 'atan')

        fEq = fEq.replace(/pi/g, 'Math.PI')
        fEq = fEq.replace(/e/g, 'Math.exp(1)')
        fEq = fEq.replace(/√/g, 'Math.sqrt')
        fEq = fEq.replace(/%/g, '/100')
        fEq = fEq.replace(/\^/g, '**')

        if (grabEquation === true) return fEq;

        try {
            func = (fEq) ? new Function('return ' + fEq) : new Function('return 0');;
            equation = func().toString()
            $('#error').slideUp();
        } catch(err) {
            if (err.toString().match('x is not defined')) err += '; it is only used in graphing';
            $('#error').text(err)
            $('#error').slideDown();
        }
        result.text(equation);
        resultHolder.scrollLeft(resultHolder.prop('scrollWidth'))
    },
    writeFormula: (e) => {
        let formula = $(e.target).attr('formula') || ''
        let varToReplace = formulaVarInput.prop('value') || '';
        if (varToReplace !== '') {
            varToReplace = varToReplace.replace(/\"\'/g,"");
            varToReplace = varToReplace.replace(/\=/g,':');
            varToReplace = varToReplace.replace(/\;/g,',');
            varToReplace = varToReplace.replace(/([^\:\,]+)\:([^\,]+)/g,'\"$1\":"$2"');
            if (varToReplace.slice(-1) === ',') varToReplace = varToReplace.slice(0, -1);
            varToReplace = '{' + varToReplace + '}';
            let object = JSON.parse(varToReplace)
            for (let key in object) {
                let regex = new RegExp(key, 'g')
                formula = formula.replace(regex, object[key])
            }
        }
        if (!equation.slice(-1).match(/[\+\-\÷\×\^]/) && equation !== '') {
            equation += '×'
        }
        equation += formula
        result.text(equation);
        resultHolder.scrollLeft(resultHolder.prop('scrollWidth'))
    }
}

document.onkeydown = (e) => {if (e.key === "Shift") functions.extraOn();}
document.onkeyup = (e) => {if (e.key === "Shift") functions.extraOff();}

let shouldMultiply = (eq, write) => {

    if (eq === '') return false;
    if (write.match(/\./g) && eq.match(/\d?\.\d+$/)) return true;
    if (write === ')') return false;
    if (eq.slice(-1).match(/[\+\-\÷\×\^]/) || write.match(/[\%\+\-\÷\×\^]/)) return false;
    if (eq.slice(-1) === '.' || write === '.') return false;
    if (eq.slice(-1) === '(') return false;
    if (eq.slice(-1) === ')' && write === ')') return false;
    if (eq.slice(-1).match(/[0-9]/) && write.match(/[0-9]/)) return false;

    return true;

}

$("div.btn").click((event) => {
    if ($(event.target).attr('use') != 'form' && $(event.target).attr('alt-use') != 'form') {
        formulaList.slideUp()
    };

    const element = $(event.target)
    if (isAltMode && element.attr('alt-write')) {
    if (shouldMultiply(equation, element.attr('alt-write'))) {
        equation += '×';
    }
    equation += element.attr('alt-write')
    result.text(equation);
    resultHolder.scrollLeft(resultHolder.prop('scrollWidth'))

    } else if (element.attr('write')) {
        if (shouldMultiply(equation, element.attr('write'))) {
            equation += '×';
        }

        equation += element.attr('write')
        result.text(equation);
        resultHolder.scrollLeft(resultHolder.prop('scrollWidth'))
    } else if (isAltMode && element.attr('alt-use') && functions[element.attr('alt-use')]) {
        functions[element.attr('alt-use')](event);
    } else if (element.attr('use') && functions[element.attr('use')]) {
        functions[element.attr('use')](event);
    }
});