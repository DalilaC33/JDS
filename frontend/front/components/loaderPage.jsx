import Loader from "./loader"

const LoaderPage = () => {
    return (
        <>
            <div>
                <Loader />
            </div>
            <style jsx>{`
                div {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.5);
                    z-index: 9999;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </>
    )
}

export default LoaderPage