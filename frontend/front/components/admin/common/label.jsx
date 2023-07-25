const Label = ({ children }) => {

    return (
        <>
            <h6 className='font-montserrat'>{children}</h6>
            <style jsx>{`
                h6 {
                    font-size: 13px;
                }
            `}</style>
        </>
    )
}

export default Label