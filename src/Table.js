import { useState, useEffect, createRef } from 'react';
import './Table.css';

function Table() {
    const pageSize = 50;
    const[data, setData] = useState(null);
    const[page, setPage] = useState(1);
    const[sortBy, setSortBy] = useState(null);
    const[ascending, setAscending] = useState(false);
    const[filter, setFilter] = useState('');
    const inputLen = createRef();

    useEffect(() => {
        setPage(1);
    }, [filter]);

    function fillTable(len) {
        let arr = []
        for (let i = 0; i < len; i++)
        {
            arr.push({col1: Math.random().toString(36).slice(-8),
                col2: Math.random().toString(36).slice(-8),
                col3: Math.random().toString(36).slice(-8)});
        }
        setData(arr);
    }

    function pagination(c, m) {
        let current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    let filteredTable = data?.filter(value => {
        if(value.col1.indexOf(filter) !== -1 || value.col2.indexOf(filter) !== -1 || value.col3.indexOf(filter) !== -1)
            return true
    })

    let table = filteredTable
        ?.sort((a, b) => {
        if (sortBy === 'col1')
            if (ascending)
                if(a.col1 > b.col1) return 1
                else return -1
            else
                if(a.col1 < b.col1) return 1
                    else return -1
        if (sortBy === 'col2')
            if (ascending)
                if(a.col2 > b.col2) return 1
                else return -1
            else
                if(a.col2 < b.col2) return 1
                    else return -1
        if (sortBy === 'col3')
            if (ascending)
                if(a.col3 > b.col3) return 1
                else return -1
            else
                if(a.col3 < b.col3) return 1
                    else return -1})
        .slice((page-1) * pageSize, (page-1) * pageSize + pageSize)
        .map((en, i) => <tr key={i}><td>{en.col1}</td><td>{en.col2}</td><td>{en.col3}</td></tr>)

    let paginator = pagination(page, Math.ceil(filteredTable?.length / 50))
        .map(el => <button style={el === page ? {background: 'salmon'} : {background: 'initial'}}
                           onClick={() => el !== '...' ? setPage(el) : null}>{el}</button>)

    return(
        <div>
            <input placeholder='Фильтр' onChange={event => setFilter(event.target.value)} />
            <input placeholder='Кол-во записей' ref={inputLen}/>
            <button onClick={() => fillTable(inputLen.current.value)}>заполнить</button>
            <div className='Pagination'>
                {paginator}
            </div>
            <table>
                <thead>
                    <tr onClick={() => setAscending(prevState => !prevState)}>
                        <th onClick={() => setSortBy('col1')}>Column 1</th>
                        <th onClick={() => setSortBy('col2')}>Column 2</th>
                        <th onClick={() => setSortBy('col3')}>Column 3</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>
            <div className='Pagination'>
                {paginator}
            </div>
        </div>
    );
}

export default Table;