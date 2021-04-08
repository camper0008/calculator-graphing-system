

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
    } catch(error) {
        throw new Error(`'${id}' not found! ` + error);
    }
};

const convertElementToHTMLElement = (element: Element) => {
    try {
        const originalId = element.id;
        const newId = Math.floor(Math.random() * 10000).toString();
        element.id = newId;
        const htmlElement = <HTMLElement>document.getElementById(newId);
        element.id = originalId;
        return htmlElement;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export const qOne = (query: string) => {
    try {
        return convertElementToHTMLElement(<Element>document.querySelector(query));
    } catch(error) {
        throw new Error(`'${query}' not found! ` + error);
    }
}

export const qAll = (query: string) => {
    try {
        const elements = document.querySelectorAll(query);
        const htmlElements: HTMLElement[] = [];
        elements.forEach((element) => {
            try {
                htmlElements.push(convertElementToHTMLElement(element)!);
            } catch(error) {
                console.error(error);
            }
        })
        return htmlElements;
    } catch(error) {
        throw new Error(`Error when querying '${query}'! ` + error);
    }
}

