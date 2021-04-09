
const calculator = (): HTMLDivElement => {
    const div = document.createElement('div');
    div.innerHTML = 'fjskldfjklsdjfkl';
    return div;
}

const main = () => {
    
    const app = document.getElementById('app')!;
    app.appendChild(calculator());
    
}

main();
