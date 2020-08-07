
const tableFooterEl = document.querySelector('.table-footer');

export default (page, pages, setPageHandler) => {
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');
    
    prevButton.innerText = 'Previous';
    
    if(page > 1) {
        prevButton.onclick = () => setPageHandler(page - 1);
    } else {
        prevButton.disabled = true;
    }

    nextButton.innerText = 'Next';

    if(page < pages) {
        nextButton.onclick = () => setPageHandler(page + 1);
    } else {
        nextButton.disabled = true;
    }

    tableFooterEl.innerHTML = '';

    tableFooterEl.appendChild(prevButton);
    
    for(let i = 1; i <= pages; i++) {
        const numberEl = document.createElement('div');

        numberEl.innerText = i;
        numberEl.classList.add('table-page-number');

        if(i != page) {
            numberEl.onclick = () => setPageHandler(i);
        } 

        tableFooterEl.appendChild(numberEl);
    }

    tableFooterEl.appendChild(nextButton);
}