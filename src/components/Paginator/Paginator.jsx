import '../../index.scss'


const Paginator = ({setPage, fullCollection, pageSize = 3, page}) => {

    let pagesCount = Math.ceil(fullCollection.length / pageSize);
    console.log(fullCollection)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <ul className="pagination">
                {pages
                    .map((p) => (<li onClick={() => setPage(p)} key={p.index} className={p === page ? 'active' : ''}>
                            {p}
                        </li>)
                    )}
            </ul>
        </div>
    );
};

export default Paginator;