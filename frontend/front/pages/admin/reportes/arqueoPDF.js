import React from "react";

const Table = ({lista}) => {

    console.log(lista)
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
                            
                              <tbody className={estilos.fila_tabla}>
                                   {lista.map((data, index) =>
                                          <tr key={index}>
                                             
                                              <td valign="middle">{Intl.NumberFormat('de-DE').format(data?.Factura?.Cliente?.Solicitud?.Usuario.CI)}</td>
                                              <td valign="middle">{data?.Factura?.Cliente?.Solicitud?.Usuario.Apellido}</td>
                                              <td valign="middle">{data?.Factura?.Cliente?.Solicitud?.Usuario.Nombre}</td>
                                              <td valign="middle">{data?.Factura.Numero}</td>
                                              <td valign="middle">{data?.Numero}</td>
                                              <td valign="middle"  className={
                                                                      data?.Factura?.Estado.Nombre === "Pagado"
                                                                        ? "text-success"
                                                                        : "text-danger"
                                                                    }>{data?.Factura?.Estado.Nombre}</td>
                                              <td valign="middle">{Intl.NumberFormat('de-DE').format(data?.Factura.Total)} Gs.</td>
                                          </tr>
                            
                                   )} 
                              </tbody>                                                 
                          </table>)
                            }
  
  export default Table;
  