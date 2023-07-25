import userStore from "../../store/userStore"
import { useState, useEffect } from "react"
import usePut from "../../api-config/usePut"
import estilos from "../../styles/editar_perfil.module.css"
import Link from "next/link"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import { Button, Form } from "react-bootstrap"
import PerfilLayout from "../../components/user/perfil/perfiLayout"
import PerfilMenu from "../../components/user/perfil/menu"
import Contenedor from "../../components/user/contenedor"
import Router from "next/router"
import Head from "next/head"
import { ToastContainer, toast } from 'react-toastify'
import Loader from "../../components/loader"

const Editar = ({ onModalChange }) => {
  const { user, fetchUser } = userStore()
  const path1 = "/user/perfil"
  const _enviarDato = usePut("/api/usuarios")
  const [datos, setUsuario] = useState({})
  //metodo para mensaje de error
  const toastDanger = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    })
  }
  //metodo para mensaje de confirmacion 
  const toastSucessfull = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    })
  }


  useEffect(() => {
    if (user.statusCode === 200) {
      setUsuario(user?.data)
    }
  }, [user.statusCode])

//si guarda corerctamente retorna a la pagina de perfil
// cuando es estatus de modificado
  useEffect(() => {
    if (_enviarDato.statusCode === 204) {
      fetchUser()
      toastSucessfull('Guardado correctamente')
      //Router.push(path1)
    }
  }, [_enviarDato.statusCode])

//si estatus es 400 muestra mensaje de error
  useEffect(() => {
    if (_enviarDato?.statusCode == 400) {
      toastDanger('Ocurrió un error al actualizar los datos')
    }
  }, [_enviarDato?.statusCode])

  const formik = useFormik({
    initialValues: {
      /*valores de name definidos en fiel .valor inicial */
      nombre: user.Nombre,
      apellido: user.Apellido,
      ci: user.CI,
      telefono: user.Celular,
      correo: user.Email,
    },
    onSubmit: (values) => {
      /*trae datos del input y lo amacena en la BD */
      const datosModificados = {
        Id: user.Id,
        Nombre: values.nombre,
        Apellido: values.apellido,
        CI: values.ci,
        Celular: values.telefono,
        Email: values.correo,
      }
      _enviarDato.fetch(datosModificados, user.Id)
    },
  })

  return (
    <>
      <Head>
        <title>Perfil-Editar</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Contenedor className="">
        <PerfilLayout >
          <div className={`${estilos.fondo} d-block`}>
            <ToastContainer />
            <div className={estilos.boxHorizontal}>
              <PerfilMenu></PerfilMenu>
            </div>
            <div className={`${estilos.disposicion} `}>
              <div className={estilos.box1}>
                <PerfilMenu></PerfilMenu>
              </div>
              {
                user ?
                  <div className={estilos.box2}>
                    <div className="w-100 pe-3">
                      <div className={`${estilos.tamanho} d-flex `}>
                        <Form onSubmit={formik.handleSubmit} className={`${estilos.tamInput} `}>
                          <Form.Group >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                              type="text"
                              name="nombre"
                              autoComplete="off"
                              required
                              value={formik.values.nombre}
                              onChange={formik.handleChange}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                              type="text"
                              name="apellido"
                              required
                              autoComplete="off"
                              value={formik.values.apellido}
                              onChange={formik.handleChange}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Cedula de Identidad</Form.Label>
                            <Form.Control
                              type="text"
                              title="Ingrese solo numeros"
                              pattern="[0-9]+"
                              name="ci"
                              required
                              autoComplete="off"
                              value={formik.values.ci}
                              onChange={formik.handleChange}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Celular</Form.Label>
                            <Form.Control
                              type="text"
                              title="Ingrese solo numeros"
                              pattern="[0-9]+"
                              name="telefono"
                              required
                              autoComplete="off"
                              value={formik.values.telefono}
                              onChange={formik.handleChange}
                            />
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                              type="email"
                              name="correo"
                              required
                              autoComplete="off"
                              value={formik.values.correo}
                              onChange={formik.handleChange}
                            />
                          </Form.Group>
                          <Form.Group className={estilos.grupoBotones}>
                            <Button
                              type="submit"
                              onClick={onModalChange}
                              className={` ${estilos.botonGuardar} btn btn-primary btn-block  `}
                            >
                              Guardar
                            </Button>
                            <Link href={path1}>
                              <Button
                                className={` ${estilos.botonCancelar}  btn btn-secondary `}
                              >
                                Cancelar
                              </Button>
                            </Link>
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </div>
                  :
                  <Loader />
              }
            </div>
          </div>
        </PerfilLayout>
      </Contenedor>
    </>
  )
}
export default Editar
