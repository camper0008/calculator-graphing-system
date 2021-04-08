import { calculator } from './calculator';

const main = () => {
    
    const page = window.location.pathname.split('/').pop();
    
    switch(page) {
        
        case 'calculator.html': {
            calculator();
            break;
        }
        
        case 'graphing.html': {
            // graphing.ts
            break;
        }
        
        default: {
            throw new Error('File not found!');
        }
        
    }
    
}

main();
