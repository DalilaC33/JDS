import { useFormik } from "formik";
import { useState } from "react";

const CargarLectura = ({ show, handleClose, handleSave }) => {
    const formik = useFormik({
        initialValues: {
            LecturaActual: ""
        },
        onSubmit: (values, { resetForm }) => {
            const request = {
                LecturaActual: values.LecturaActual
            }
            handleSave(request)
            resetForm()
        }
    })
    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <h6 className="font-montserrat fw-bold">Lectura Actual:</h6>
                    <input className="input_" type="text" placeholder="9.." autoComplete="off" name='LecturaActual' title="Ingrese solo numeros" pattern="[0-9]+" value={formik.values.LecturaActual} onChange={formik.handleChange} />
                    <div className="text-end mt-1">
                        <button className="btn btn-primary" type="submit">Cargar Lectura</button>
                    </div>

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
export default CargarLectura