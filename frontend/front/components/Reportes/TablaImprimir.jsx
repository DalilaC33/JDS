


const Table = ({lista}) => {
    return (
        <table className="table table-hover border border-top-0 mx-3 " id="reportes">
            <div style={{ display: "none" }}>
            <thead >Junta de Saneamiento Ñande Y  </thead>
            <tr>Reporte Arqueo de Caja</tr>
            <tr>Fecha: </tr>
            </div>
                              <thead className='border border-2 '>
                                      <th scope='col' className=''> C.I.Nº </th>
                                      <th scope="col">Apellidos</th>
                                      <th scope="col">Nombres</th>
                                      <th scope="col">Factura N°</th>
                                      <th scope="col">Recibo N°</th>
                                      <th scope="col">Estado</th>
                                      <th scope="col">Monto</th>
                                  
                              </thead>
                            
                              <tbody >
                                   
                              </tbody>                                                 
                          </table>)
                            }
  
  export default Table;