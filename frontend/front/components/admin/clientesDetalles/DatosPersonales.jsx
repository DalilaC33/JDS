import useGetAll from "../../../api-config/useGetAll";
import Label from "../common/label"
import { FaUserCircle } from 'react-icons/fa'

const DatosPersonales = ({ClienteActual}) => {
    const { data } = useGetAll("/api/motivos");
    return (
        <div className='m-3'>
            
                <div className='w-100 pe-3 row'>
                    
                       <div className="col-lg-4 col-md-6  col-sm-12 text-center ">
                       <FaUserCircle size={150} color={'grey'}/>
                    
                       </div>
                       
                        <div className='col-lg-4 col-md-6 d-flex col-sm-12'>
                            <div>
                                <Label><b>Nombres:</b></Label>
                                <Label><b>Apellidos:</b></Label>
                                <Label><b>C.I.:</b></Label>
                                <Label><b>Celular:</b></Label>
                                <Label><b>Barrio:</b></Label>
                                <Label><b>Referencia:</b></Label>
                            </div>
                            
                            <div className='col-lg-4 col-md-6  col-sm-12 flex-grow-1 ps-3'>
                                <Label>{ClienteActual?.Nombre}</Label>
                                <Label>{ClienteActual?.Apellido}</Label>
                               
                                <Label> {new Intl.NumberFormat('es-CO').format(Number(ClienteActual?.CI) ?? 0)}</Label>
                                <Label>{ClienteActual?.Celular}</Label>
                                <Label>{ClienteActual?.Barrio}</Label>
                                <Label>{ClienteActual?.Referencia}</Label>
                            </div>
                    
                        </div>
                    <div className='d-flex col-4'>
                        <div>
                            <Label><b>Email:</b></Label>
                            <Label><b>Cta. Ctral:</b></Label>
                            <Label><b>Estado:</b></Label>
                            <Label><b>Medidor Nro:</b></Label>
                            <Label><b>Inscripcion:</b></Label>
                            
                        </div>
                        
                        <div className='flex-grow-1 ps-3'>
                            <Label>{ClienteActual?.Email}</Label>
                            <Label>{ClienteActual?.Cta_Ctral}</Label>
                            <Label>{ClienteActual?.Estado}</Label>
                            <Label>{ClienteActual?.Medidor_Nro}</Label>
                           

                            <Label>{ClienteActual?.Inscripcion}</Label>
                           
                        </div>
                    </div>
                  
                </div>
                
            </div>
        
    )
}

export default DatosPersonales;