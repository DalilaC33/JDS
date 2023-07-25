import LeafletMap from "../../../leafletMap"
import Label from "../../common/label"
import DownloadButton from "../downloadButton"

const DesktopContent = ({solicitudActual}) => {
    return (
        <>
            <div className='w-50 pe-3'>
                <div className='d-flex'>
                    <div>
                        <Label><b>Nombres:</b></Label>
                        <Label><b>Apellidos:</b></Label>
                        <Label><b>C.I.:</b></Label>
                        <Label><b>Celular:</b></Label>
                        <Label><b>Barrio:</b></Label>
                        <Label><b>Referencia:</b></Label>
                    </div>
                    <div className='flex-grow-1 ps-3'>
                        <Label>{solicitudActual?.Usuario?.Nombre}</Label>
                        <Label>{solicitudActual?.Usuario?.Apellido}</Label>
                        <Label>{solicitudActual?.Usuario?.CI}</Label>
                        <Label>{solicitudActual?.Usuario?.Celular}</Label>
                        <Label>{solicitudActual?.Barrio?.Nombre}</Label>
                        <Label>{solicitudActual?.Referencia}</Label>
                    </div>
                </div>
                <div className='mt-2'>
                    <Label><b>Escaneado de Cédula de Identidad:</b></Label>
                    <DownloadButton text={solicitudActual?.Id +'_'+ solicitudActual?.Usuario?.Nombre +'_'+solicitudActual?.Usuario?.Apellido+'_CI.pdf'} fileKey={solicitudActual?.EtagCI} />
                </div>
                <div className='mt-2'>
                    <Label><b>Escaneado de Título o Pago de Impuesto:</b></Label>
                    <DownloadButton text={solicitudActual?.Id +'_'+ solicitudActual?.Usuario?.Nombre +'_'+solicitudActual?.Usuario?.Apellido+'_TITULO.pdf'} fileKey={solicitudActual?.EtagTitulo}/>
                </div>
            </div>
            <div className='w-50'>
                <div className='d-flex'>
                    <div>
                        <Label><b>Email: </b> {solicitudActual?.Usuario?.Email}</Label>
                        <Label><b>Es propietario del inmueble: </b> {solicitudActual?.EsPropietario ? 'Si' : 'No'}</Label>
                    </div>
                </div>
                <div>
                    <Label><b>Referencia Satelital:</b></Label>
                    <LeafletMap default_center={solicitudActual?.ReferenciaSatelital} />
                </div>
            </div>
        </>
    )
}

export default DesktopContent