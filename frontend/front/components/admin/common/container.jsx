const Container = ({ children, width }) => {
    return (
        <div className='contenedor' style={{width:`${width}`, height:`100%`}}>
            <div className='x-marker'/>
            {children}
            <style jsx>{`
                .contenedor {
                    box-shadow: 0 0 3px 1px #d0d0d0;
                    position: relative;
                    background: white;
                    border-radius: 0 0 3px 3px;
                }
                .x-marker {
                    position: absolute;
                    background: blue;
                    height: 4px;
                    width: 100%;
                    border-radius: 0 0 25px 25px;
                    left: 0;
                    top: 0;
                }
                
            `}</style>
        </div>
    )
}

export default Container