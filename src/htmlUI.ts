
abstract class UIElement {
    
    public htmlElement: HTMLElement;
    public children: {element: UIElement, index: number}[];
    
    constructor(htmlElement: HTMLElement) {
        this.htmlElement = htmlElement;
        this.children = [];
    }
    
    public getId = () => this.htmlElement.id;
    public setId = (value: string) => this.htmlElement.id = value;
    
    public getClass = () => this.htmlElement.className.split(' ');
    public setClass = (...values: string[]) => this.htmlElement.className = values.join(' ');
    
    
    
    public getChild = (index: number) => {
        for(let i in this.children) {
            if(this.children[i].index === index) return this.children[i].element;
        }
    }
    public getAllChildren = () => {
        let elements: UIElement[] = [];
        for(let i in this.children) elements.push(this.children[i].element);
        return elements;
    }
    public getChildById = (id: string) => {
        for(let i in this.children) {
            if(this.children[i].element.getId() === id) return this.children[i].element;
        }
    }
    public getChildrenByClass = (...classNames: string[]) => {
        let children: UIElement[] = [];
        for(let i in this.children) {
            let relevant = true;
            for(let className in classNames) {
                if(!this.children[i].element.htmlElement.className.split(' ').find(n => n === className)) relevant = true;
            }
            if(relevant) children.push(this.children[i].element);
        }
        return children;
    }
    
    
    
    public addChild = (element: UIElement) => {
        let index = 0;
        for(let i in this.children) if(index < this.children[i].index) index = this.children[i].index + 1;
        this.children.push({element, index});
        return index;
    }
    
    public removeChild = (element: UIElement) => {
        let child: UIElement | null = null;
        for(let i = 0; i < this.children.length; i++) {
            if(this.children[i].element === element) {
                child = this.children[i].element;
                this.children = this.children.slice(0, i).concat(this.children.slice(i + 1, this.children.length));
            }
        }
        return child;
    }
    
    public addChildren = (...elements: UIElement[]) => {
        let returnElements: number[] = [];
        for(let i in elements) returnElements.push(this.addChild(elements[i]));
        return returnElements;
    }
    public removeChildren = (...elements: UIElement[]) => {
        let returnElements: UIElement[] = [];
        for(let i in elements) {
            const returnElement = this.removeChild(elements[i]);
            if(returnElement) returnElements.push(returnElement);
        }
        return returnElements;
    }
    
}

export const renderUI = (element: UIElement) => {
    
}


export class UIDiv extends UIElement {
    
    constructor() {
        super(document.createElement('div')); 
    }
    
}


