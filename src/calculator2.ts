
/*
 * Author:
 *  SimonFJ20
 * 
 * Contents:
 *  Rewritten version of calculator.ts
 */

import { qAll, qOne } from "./utils";



interface UseArgument {
    html: HTMLElement,
    mouse: MouseEvent,
}



const shouldMultiply = (eq: string, write: string) => {
    if(eq === '') return false;
    if(write.match(/\./g) && eq.match(/\d?\.\d+$/)) return true;
    if(write === ')') return false;
    if(eq.slice(-1).match(/[\+\-\÷\×\^]/) || write.match(/[\%\+\-\÷\×\^]/)) return false;
    if(eq.slice(-1) === '.' || write === '.') return false;
    if(eq.slice(-1) === '(') return false;
    if(eq.slice(-1) === ')' && write === ')') return false;
    if(eq.slice(-1).match(/[0-9]/) && write.match(/[0-9]/)) return false;
    return true;
}



class Calculator2 {

    private equation: string;
    private altMode: boolean;

    private htmlResult!: HTMLElement;
    private htmlResultText!: HTMLElement;
    private htmlFormulaList!: HTMLElement;
    private htmlFormulaVarInput!: HTMLElement;
    private htmlError!: HTMLElement;

    private hideFormulaList = () => {
        this.htmlFormulaList.className = 'closed';
        this.htmlFormulaList.style.visibility = 'hidden';
    }

    private hideErrorAndFormulaList = () => {
        this.htmlError.hidden = true;
    }

    private getHtmlElements = () => {
        this.htmlResult = qOne('#result text')!;
        this.htmlResultText = qOne('#result')!;
        this.htmlFormulaList = qOne('#formulaList')!;
        this.htmlFormulaVarInput = qOne('#formulaVarInput')!;
        this.htmlError = qOne('#error')!;
    }

    private updateResultText = () => {
        this.htmlResult.innerText = this.equation;
        this.htmlResultText.scrollLeft = this.htmlResultText.scrollWidth;
    }

    private decodeUseAttr = (use: string) => {
        switch(use) {
            case 'form': return this.buttonFormListClickHandler;
            case 'clearOne': return this.deleteOneChar;
            case 'clearAll': return this.clearEquation;
            case 'graph': return this.openGraphingTool;
            case 'random': return this.insertRandomNumber;
            case 'answer': return this.calculateEqation;
            case 'extraOn': return this.altModeOn;
            case 'extraOff': return this.altModeOff;
            case 'writeFormula': return this.writeFormula;
            default: return undefined;
        }
    }

    private convertDefinitionsToObject = (formula: string, value: string) => {
        if (value !== '') {
            value = value.replace(/\"\'/g, "").replace(/\=/g, ':').replace(/\;/g, ',');
            value = value.replace(/([^\:\,]+)\:([^\,]+)/g, '\"$1\":"$2"');
            if (value.slice(-1) === ',') value = value.slice(0, -1);
            let object = JSON.parse('{' + value + '}');
            for (let key in object) formula = formula.replace(new RegExp(key, 'g'), object[key]);
        }
        if (!this.equation.slice(-1).match(/[\+\-\÷\×\^]/) && this.equation !== '') this.equation += '×';
        return formula;
    }

    private replaceEquationAliases = () => {
        let equation = this.equation;
        equation = equation.replace(/\÷/g, '/').replace(/\×/g, '*').replace(/log/g, 'Math.log');
        equation = equation.replace(/sin/g, '(180/pi)*Math.sin').replace(/cos/g, '(180/pi)*Math.cos');
        equation = equation.replace(/tan/g, '(180/pi)*Math.tan').replace(/sin\^\-1/g, 'asin');
        equation = equation.replace(/cos\^\-1/g, 'acos').replace(/tan\^\-1/g, 'atan');
        equation = equation.replace(/pi/g, 'Math.PI').replace(/e/g, 'Math.exp(1)');
        equation = equation.replace(/√/g, 'Math.sqrt').replace(/%/g, '/100').replace(/\^/g, '**');
        return equation;
    }

    private setKeyListeners = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Shift") this.altModeOn();
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === "Shift") this.altModeOff();
        });
    }

    private setButtonListeners = () => {
        qAll('div.btn').forEach((element) => {
            element.addEventListener('click', (e) => {
                const use = element.getAttribute('use');
                const altUse = element.getAttribute('alt-use');
                const write = element.getAttribute('write');
                const altWrite = element.getAttribute('alt-write');

                if(use !== 'form' && altUse !== 'form') this.hideFormulaList();

                if(this.altMode && altWrite) {
                    if(shouldMultiply(this.equation, altWrite)) this.equation += '×';
                    this.equation += altWrite;
                    this.updateResultText();
                } 
                
                else if(write) {
                    if(shouldMultiply(this.equation, write)) this.equation += '×';
                    this.equation += write;
                    this.updateResultText();
                } 
                
                else if(this.altMode && altUse && this.decodeUseAttr(altUse!)) {
                    this.decodeUseAttr(altUse!)!({mouse: e, html: element});
                }
                
                else if(use && this.decodeUseAttr(use)) {
                    this.decodeUseAttr(use!)!({mouse: e, html: element});
                }
            })
        });
    }

    private buttonFormListClickHandler = (arg: UseArgument) => { // functions.form()
        const e = arg.mouse;
        this.htmlFormulaList.hidden = false;
        this.htmlFormulaList.style.top = e.clientY + 'px';
        this.htmlFormulaList.style.left = e.clientX + 'px';
        if(this.htmlFormulaList.className === 'open') {
            this.htmlFormulaList.className = 'closed';
            this.htmlFormulaList.style.visibility = 'hidden';
        } else {
            this.htmlFormulaList.style.visibility = 'visible';
            this.htmlFormulaList.className = 'open';
        }
    }

    private deleteOneChar = () => { // functions.clearOne()
        this.equation = this.equation.substr(0, this.equation.length - 1)
        if (this.equation === '') {
            this.htmlResult.innerText = '0';
        } else {
            this.updateResultText();
        }
    }

    private clearEquation = () => { // functions.clearAll()
        this.equation = '';
        this.htmlResult.innerText = '0';
    }

    private altModeOn = () => { // functions.extraOn()
        this.altMode = true;
        qAll('div.btn[alt-text]').forEach((element) => {
            element.children[0].innerHTML = element.getAttribute('alt-text')!;
        });
    }

    private altModeOff = () => { // functions.extraOff()
        this.altMode = false;
        qAll('div.btn[alt-text]').forEach((element) => {
            element.children[0].innerHTML = element.getAttribute('text')!;
        });
    }

    private insertRandomNumber = () => { // functions.random()
        const randomNumber = Math.random().toString().slice(0, 5);
        if(shouldMultiply(this.equation, randomNumber)) this.equation += '×';
        this.equation += randomNumber;
        this.updateResultText();
    }

    private calculateEqation = () => { // functions.answer()
        try {
            const equation = this.replaceEquationAliases();
            const func = (equation) ? new Function('return ' + equation) : new Function('return 0');
            this.equation = func().toString();
            this.htmlError.hidden = true;
        } catch(error) {
            if(error.toString().match('x is not defined')) error += '; it is only used in graphing';
            console.log('sfdsdfsfd')
            this.htmlError.innerText = error;
            this.htmlError.hidden = false;
        }
        this.updateResultText();
    }

    private openGraphingTool = () => { // functions.graph()
        window.open(window.location.pathname.replace('calculator2.html', 'graphing.html?stdgraph=' + this.replaceEquationAliases()));
    }

    private writeFormula = (arg: UseArgument) => { // functions.writeFormula()
        const element = arg.html;
        let formula = element.getAttribute('formula') || '';
        let value = this.htmlFormulaVarInput.getAttribute('value') || '';
        formula = this.convertDefinitionsToObject(formula, value);
        this.equation += formula;
        this.updateResultText();
    }

    public constructor() {
        this.equation = '';
        this.altMode = false;
        this.getHtmlElements();
        this.hideErrorAndFormulaList();
        this.setButtonListeners();
        this.setKeyListeners();
    }

}

export const calculator2 = () => {
    new Calculator2();
}

