import React from 'react';

export default ({ page, pages, changePage }) => {
    const pagesArr = [];
    for (let i = 1; i <= pages; i++) {
        pagesArr.push(
            <div key={i}
                className='table-page-number'
                onClick={() => { if (page !== i) changePage(i) }}>
                {page === i ? <b>{i}</b> : i}
            </div>);
    }
    return (
        <div className='table-footer'>
            <button
                className='page-button'
                disabled={page === 1 ? true : false}
                onClick={() => { if (page > 1) changePage(page - 1) }}>Previous
            </button>
            {pagesArr}
            <button
                className='page-button'
                disabled={page === pages ? true : false}
                onClick={() => { if (page < pages) changePage(page + 1) }}>Next
            </button>
        </div>
    )
}