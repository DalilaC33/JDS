import { formatDate } from "../../../utils"

const TableRow = ({ lista, idActivo, onSolicitudActualChange, verMas, siguientePag }) => {

    return (
        <div className="table_box">
            <table className="table mb-1">
                <thead>
                    <tr className="table_header">
                        <th scope="col">N°</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Nombre/s y Apellido/s</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length && lista.map((solicitud, index) =>
                        <tr key={index} 
                            onClick={() => onSolicitudActualChange(solicitud.Id)}
                            className={(idActivo === solicitud.Id)? 'rowData isSelected' : 'rowData'}>
                            <th scope="row">{solicitud.Id}</th>
                            <td>{formatDate(new Date(solicitud.Fecha))}</td>
                            <td>{`${solicitud?.Usuario?.Nombre.split(' ')[0]} ${solicitud?.Usuario?.Apellido.split(' ')[0]}`}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!!siguientePag && <div className="d-flex justify-content-center">
                <button className="btn btn-outline-info btn-sm" onClick={verMas}>Ver más</button>
            </div>}
            <style jsx>{`
                .table_box {
                    height: 27.6rem;
                    overflow-y: scroll;
                    overflow-x: hidden;
                }
                .table_header {
                    position: sticky;
                    top: 0px;
                    background: white;
                    box-shadow: 1px 1px 0.5px #aaa;

                }
                th, td {
                    font-size: 13px;
                    font-family: montserrat;
                }
                .rowData:hover {
                    background: #D8FDFF;
                    color: blue;
                    cursor: pointer;
                }
                .isSelected {
                    font-weight: 700;
                    color: blue;
                }
                .btn:focus {
                    box-shadow: none;
                }
            `}</style>
        </div>
    )
}

export default TableRow