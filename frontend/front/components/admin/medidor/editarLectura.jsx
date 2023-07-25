import { useFormik } from "formik";
import { useState } from "react";
import ModalMensaje from "../clientes/modalMensaje";

const EditarLectura = ({ show, handleClose, handleSave, idLecturaEditar }) => {
    const [modalMensaje, setModalMensaje] = useState(false)
    const [aceptar, setAceptar] = useState(false)
    const formik = useFormik({
        initialValues: {
            LecturaId: "", LecturaActual: ""
        },
        onSubmit: (values) => {
            setModalMensaje(true)
            if (aceptar) {
                const request = {
                    Id: Number(idLecturaEditar),
                    LecturaActual: Number(values.LecturaActual)
                }
                handleSave(request)
                handleClose()
            } 
        }
    })

    const editarLectura = () => {
        setAceptar(true)
        formik.handleSubmit()
    }

    return (
        <>
            <div>

                <form onSubmit={formik.handleSubmit}>
                    <h6 className="font-montserrat fw-bold">Lectura Actual:</h6>
                    <input className="input_" type="text" placeholder="9..." autoComplete="off" name='LecturaActual' title="Ingrese solo numeros" pattern="[0-9]+" value={formik.values.LecturaActual} onChange={formik.handleChange} />
                    <div className="text-end mt-1">
                        <button className="btn btn-info" onClick={() => setModalMensaje(true)}>Editar Lectura</button>
                    </div>
                    <ModalMensaje
                        show={modalMensaje}
                        handleClose={() => setModalMensaje(false)}
                        onModalAcept={editarLectura}
                        mensaje={"Estas seguro que deseas Editar esta Lectura?"}
                        titulo={"Editar Lectura"}
                        tipo={1}
                    >
                    </ModalMensaje>
                </form>
            </div>

            <style jsx>{`
        .input_{
            width: 30%;
            border: 1px solid #eaeaea;
            box-shadow: 1px 1px 2px 1px rgba(214, 209, 209, 0.959);
            border-radius: 3px;

        }

      `}</style>
        </>
    )
}
export default EditarLectura