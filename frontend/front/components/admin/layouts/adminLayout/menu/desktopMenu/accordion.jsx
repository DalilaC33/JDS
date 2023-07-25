const Accordion = ({ text, id, children }) => {

    return (
        <div className='accordion-item'>
            <h2 className='accordion-header' id={`flush-heading${id}`}>
                <button className='accordion-button collapsed title'
                    type='button' data-bs-toggle='collapse' 
                    data-bs-target={`#flush-collapse${id}`}
                    aria-expanded='false' 
                    aria-controls={`flush-collapse${id}`}>
                    { text }
                </button>
            </h2>
            <div id={`flush-collapse${id}`}
                className='accordion-collapse collapse'
                aria-labelledby={`flush-heading${id}`}
                data-bs-parent='#accordion'>
                <div className='accordion-body p-0'>
                    { children }
                </div>
            </div>
            <style jsx>{`
                .gray-color {
                    color: gray;
                    fill: gray;
                }
                .title {
                    font-size: 15px;
                    font-weight: 600;
                    color: gray;
                }
            `}</style>
        </div>
    )
}

export default Accordion