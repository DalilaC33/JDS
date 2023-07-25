import DesktopContent from "./desktopContent"
import MobileContent from "./mobileContent"

const RequestData = ({solicitudActual}) => {
    return (
        <>
            <h6 className='text-center'><b>Solicitud N°: </b>{solicitudActual?.Id}</h6>
            <div className='desktop_design'>
                <DesktopContent solicitudActual={solicitudActual}/>
            </div>
            <div className='mobile_design'>
                <MobileContent solicitudActual={solicitudActual}/>
            </div>
            <style jsx>{`
                .desktop_design { 
                    display: flex;
                }
                .mobile_design {
                    display: none;
                }
                @media only screen and (max-width: 767px) {
                    .desktop_design {
                        display: none;
                    }
                    .mobile_design {
                        display: block;
                    }
                }
            `}</style>
        </>
    )
}

export default RequestData