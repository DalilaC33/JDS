import { useEffect, useState } from "react"
import { BiSearch } from 'react-icons/bi'
import useGet from "../../../api-config/v2/useGet"
import { dateWithFormat } from "../../../utils"

const FilterBox = ({ onSubmit }) => {

    const estados = useGet('/api/estados')
    const [CIPrevio, setCIPrevio] = useState('')
    const [CI, setCI] = useState('')
    const [NumeroPrevio, setNumeroPrevio] = useState('')
    const [Numero, setNumero] = useState('')
    const [FechaDesde, setFechaDesde] = useState(dateWithFormat(new Date(), 30))
    const [FechaHasta, setFechaHasta] = useState(dateWithFormat(new Date(), 0))
    const [EstadoId, setEstadoId] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit({CI, Numero, FechaDesde, FechaHasta, EstadoId})
    }

    const handleCIChange = event => {
        const ciValue = event.target.value.replaceAll('.', '').trim()
        if (!/[a-zA-Z]/.test(ciValue)) {
            setCI(ciValue)
            if (CIPrevio.length < ciValue.length) {
                setCIPrevio(ciValue)
            }
        }
    }

    const handleCIBlur = event => {
        if (!event.target.value.length && CIPrevio.length) {
            setCIPrevio(event.target.value)
            onSubmit({CI, Numero, FechaDesde, FechaHasta, EstadoId})
        }
    }

    const handleNumeroChange = event => {
        const numeroValue = event.target.value.trim()
        if (!/[a-zA-Z]/.test(numeroValue)) {
            setNumero(numeroValue)
            if (NumeroPrevio.length < numeroValue.length) {
                setNumeroPrevio(numeroValue)
            }
        }
    }

    const handleNumeroBlur = event => {
        if (!event.target.value.length && NumeroPrevio.length) {
            setNumeroPrevio(event.target.value)
            onSubmit({CI, Numero, FechaDesde, FechaHasta, EstadoId})
        }
    }

    const handleFechaDesdeChange = event => {
        setFechaDesde(event.target.value)
    }

    const handleFechaHastaChange = event => {
        setFechaHasta(event.target.value)
    }

    const handleEstadoIdChange = event => {
        setEstadoId(event.target.value)
    }

    useEffect(() => {
        estados.fetch({page: 0, size: 10})
    }, [])

    return (
        <>
            <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
                <div className="col-auto">
                    <input type="search" className="form-control" autoComplete="off" placeholder='C.I N°' name="CI"
                            onBlur={handleCIBlur}
                            value={CI}
                            onChange={handleCIChange}/>
                </div>
                <div className="col-auto">
                    <input type="search" className="form-control" autoComplete="off" placeholder='Factura N°' name="Numero"
                            onBlur={handleNumeroBlur}
                            value={Numero}
                            onChange={handleNumeroChange}/>
                </div>
                <div className="col-auto">
                    <input type="date" title="Fecha Desde" className="form-control" autoComplete="off"  name="FechaDesde"
                            value={FechaDesde}
                            onChange={handleFechaDesdeChange}
                            min="2021-12-01" max={dateWithFormat(new Date(), 0)}/>
                </div>
                <div className="col-auto">
                    <input type="date" title="Fecha Hasta" className="form-control" autoComplete="off"  name="FechaHasta"
                            value={FechaHasta}
                            onChange={handleFechaHastaChange}
                            min="2021-12-01" max={dateWithFormat(new Date(), 0)}/>
                </div>
                <div className="col-auto">
                    <select title="Estado" className="form-select form-select" name="EstadoId"
                            value={EstadoId}
                            onChange={handleEstadoIdChange} >
                                <option defaultValue={0}>Estado</option>
                                <option value={0}>Todo</option>
                                {estados.data?.content?.map((estado, index) =>  
                                {
                                    if (estado.Nombre === 'Pendiente' || estado.Nombre === 'Pagado' || estado.Nombre === 'Anulado' || estado.Nombre === 'Recargado') {
                                        return <option key={index} value={estado.Id}>{estado.Nombre}</option>
                                    }
                                }
                                )}
                    </select>
                </div>
                <div className="col-auto">
                    <button type="submit" className="submit-btn">
                        <BiSearch size={29}></BiSearch>
                    </button>
                </div>
            </form>

            <style jsx>{`
                input[type="search"]::-webkit-search-cancel-button {
                    -webkit-appearance: searchfield-cancel-button;
                    filter: invert(78%) sepia(4%) saturate(15%) hue-rotate(28deg) brightness(94%) contrast(96%);
                    cursor: pointer;
                }
                .submit-btn {
                    border: none;
                    background: none;
                    cursor: pointer;
                }
            `}</style>
        </>
    )

}

export default FilterBox