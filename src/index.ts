

const main = () => {
    
    const page = window.location.pathname.split('/').pop();
    
    switch(page) {
        
        case 'calculator.html': {
            // calculator.ts
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
