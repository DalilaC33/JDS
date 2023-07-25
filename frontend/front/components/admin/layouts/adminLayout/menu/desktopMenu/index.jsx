import Accordion from './accordion'
import Item from './item'

import { AiFillHome }  from "react-icons/ai"
import { TiWarning } from 'react-icons/ti'
import { FaUserTie } from 'react-icons/fa'
import { GoBell } from "react-icons/go"

const Menu = () => {

    return(
        <>
            <div className='font-montserrat'>
                <Item title='Home'                  path='/admin'               icon={<AiFillHome size={22}/>} />
                <Item title='Solicitud de Conexión' path='/admin/solicitudes'   icon={<GoBell size={22}/>} />
                <Item title='Reclamos'              path='/admin/reclamos'      icon={<TiWarning  size={22}/>} />
                <Item title='Medidor'               path='/admin/medidor'       icon={<img  src='/measurer.svg' alt='medidor icon' width='22' />} />
                <Item title='Clientes'              path='/admin/clientes'      icon={<FaUserTie size={22}/>} />
                <div className='accordion accordion-flush border-light-gray' id='accordion'>
                    <Accordion text='CAJA' id='One'>
                        <Item title='Facturación'   path='/admin/caja/facturacion' />
                        <Item title='Cobros'        path='/admin/caja/cobros' />
                    </Accordion>
                    <Accordion text='REPORTES' id='Two'>
                        <Item title='Arqueo de Caja'    path='/admin/reportes/arqueo' />
                        <Item title='Lista de morosos'  path='/admin/reportes/morosos' />
                        <Item title='Lista de Reclamos'  path='/admin/reportes/reclamos' />
                    </Accordion>
                </div>
            </div>
            <style jsx>{`
                .border-light-gray {
                    border: 1px solid #dadada;
                }
            `}</style>
        </>
    )

}

export default Menu