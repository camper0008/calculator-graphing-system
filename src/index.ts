import { calculator } from './calculator';
import { calculator2 } from './calculator2';
import { graphing } from './graphing';

const main = () => {
    
    const page = window.location.pathname.split('/').pop();
    
    switch(page) {
        
        case 'calculator.html': {
            calculator();
            break;
        }

        case 'calculator2.html': {
            calculator2();
            break;
        }
        
        case 'graphing.html': {
            graphing();
            break;
        }
        
        default: {
            throw new Error('File not found!');
        }
        
    }
    
}

main();
