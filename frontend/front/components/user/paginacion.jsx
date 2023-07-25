const Paginacion = ({ antPag, sigPag, desabilitarPrev, desabilitarNext, actualPag, cambiarActualPage }) => {
    //disabled
    return (
        <>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className={`page-item   ${(desabilitarPrev == null) ? "disabled" : ""}`}>
                        <a className="page-link  shadow-none " href="#" onClick={antPag}>Previous</a>
                    </li>
                    <li className={`page-item  ${(actualPag === 0) ? "active" : ""}`}  onClick={() => cambiarActualPage(0)} >
                        <a className="page-link   shadow-none " href="#">1</a>
                    </li>
                    <li className={`page-item  ${(actualPag === 1) ? "active" : ""}`}  onClick={() => cambiarActualPage(1)} >
                        <a className="page-link  shadow-none " href="#">2</a>
                    </li>
                    <li className={`page-item  ${(actualPag === 2) ? "active" : ""}`} onClick={() => cambiarActualPage(2)} >
                        <a className="page-link  shadow-none " href="#">3</a>
                    </li>
                    <li className={`page-item  ${(actualPag > 2) ? "active" : ""}  ${(!desabilitarNext) ? "disabled" : ""}`}>
                        <a className="page-link  shadow-none " href="#" onClick={sigPag} >Next</a>
                    </li>
                </ul>
            </nav>

            <style jsx>{`
            
            `}</style>
        </>
    )
}

export default Paginacion