

/*
 * Author:
 *  SimonFJ20
 * 
 * Contents:
 *  Utility functions, pt. just for dom interactions, to replace JQuery
 */


export const id = (id: string) => {
    try {
        return <HTMLElement>document.getElementById(id);
    } catch {
        throw new Error(`'${id}' not found!`);
    }
};

const convertElementToHTMLElement = (element: Element) => {
    const originalId = element.id;
    const newId = Math.floor(Math.random() * 10000).toString();
    element.id = newId;
    const htmlElement = <HTMLElement>document.getElementById(newId);
    htmlElement.id = originalId;
    return htmlElement;
}

export const qOne = (query: string) => {
    try {
        return convertElementToHTMLElement(<Element>document.querySelector(query));
    } catch {
        throw new Error(`'${query}' not found!`);
    }
}

export const qAll = (query: string) => {
    try {
        const elements = document.querySelectorAll(query);
        const htmlElements: HTMLElement[] = [];
        for(let i in elements) {
            htmlElements.push(convertElementToHTMLElement(elements[i]));
        }
        return htmlElements;
    } catch {
        throw new Error(`Error when querying '${query}'!`);
    }
}

