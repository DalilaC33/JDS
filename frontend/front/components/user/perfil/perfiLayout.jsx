const PerfilLayout = ({ children }) => {
    return (
        <>
            <div className='body y-scroll'>
                <div className='d-flex justify-content-center align-items-center position-absolute w-100 h-100'>
                    {children}
                </div>
            </div>

            <style jsx>{`
            
                .body {
                    display: flex;
                    position: relative;
                    height: calc(100% - 4rem);
                    width: 100vw;
                    overflow: scroll;
                    padding-bottom: 2rem;
                }
                .y-scroll::-webkit-scrollbar {
                    display: none;
                    overflow-y: scroll;
                  }
            `}</style>
        </>
    )
}

export default PerfilLayout