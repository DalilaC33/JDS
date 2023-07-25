import Image from 'next/image'

const StaticPage = () => {
    return (
        <div className="fondo d-flex justify-content-center aling-items-center">
            <Image src='/logo.svg' alt='logo icon' width={180} height={180} priority='false'/>
            <style jsx>{`
                 .fondo {
                     background: #fff;
                     position: absolute;
                     width: 100vw;
                     height: 100vh;
                 }
            `}</style>
        </div>
    )
}

export default StaticPage