import { useFormik } from "formik";
import usePost from "../../api-config/usePost";
import { useEffect } from "react";
import { saveCookie } from "../../utils";
import userStore from "../../store/userStore";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLayout from "../../components/login/loginLayout";
import { Button, Card, Container, Form } from "react-bootstrap";
import Link from "next/link";

const Login = () => {
  const { data, statusCode, fetch } = usePost("/auth/singin");

  const setUser = userStore((state) => state.setUser);
  const router = useRouter();

  const formik = useFormik({
    initialValues: { Email: "", Password: "" },
    onSubmit: (values) => fetch(values),
  });

  useEffect(() => {
    if (statusCode === 200) {
      setUser(data.Usuario);
      saveCookie(data?.accessToken);
      const roles = data.Usuario.Rols.map((rol) => rol.Nombre);
      const isAdmin = roles.indexOf("Administrador") >= 0;
      const isModerator = roles.indexOf("Moderator") >= 0;
      if (isAdmin || isModerator) {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } else if (statusCode === 404 || statusCode === 401) {
      userNotFound();
    }
  }, [statusCode]);

  const userNotFound = () => {
    toast.info("Email o contraseña inválidos", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <LoginLayout>
      <div className="position-absolute w-100 h-100">
        <Container>
          <div className="d-flex flex-column min-vh-100">
            <div className="row justify-content-center my-auto">
              <div className="col-lg-10">
                <div className="py-5">
                  <div className="overflow-hidden">
                    <div className="row g-0 d-flex justify-content-around">
                      <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <Card className="text-center" style={{ width: "80%" }}>
                          <Card.Body>
                            <h3 className="">
                              Aun no es usuario del servicio de agua?
                            </h3>
                            <h3 className="">Solicite su conexion hoy</h3>
                            <div className="px-5 my-4">
                              <Link href="/conexion">
                                <Button className="rounded-pill">
                                  Solicitar una conexión
                                </Button>
                              </Link>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <Card
                          className="p-4 p-lg-5 bg-primary h-100 d-flex align-items-center justify-content-center"
                          style={{ width: "80%" }}
                        >
                          <div className="w-100">
                            <div className="mb-4 filter-white text-center">
                              <img src="/logo.svg" alt="logo" width={80} />
                            </div>

                            <div className="text-white-50 text-center mb-4">
                              <h3 className="text-white">Inicia Sesión</h3>
                            </div>
                            <Form onSubmit={formik.handleSubmit}>
                              <div className="form-floating form-floating-custom mb-3">
                                <Form.Control
                                  type="email"
                                  name="Email"
                                  value={formik.values.Email}
                                  onChange={formik.handleChange}
                                  id="input-username"
                                  className="rounded-pill"
                                />
                                <label htmlFor="input-username">Email</label>
                                <div className="form-floating-icon">
                                  <i className="uil uil-users-alt"></i>
                                </div>
                              </div>
                              <div className="form-floating form-floating-custom mb-3">
                                <Form.Control
                                  type="password"
                                  name="Password"
                                  value={formik.values.Password}
                                  onChange={formik.handleChange}
                                  id="input-password"
                                  className="rounded-pill"
                                />
                                <label htmlFor="input-password">
                                  Contraseña
                                </label>
                                <div className="form-floating-icon">
                                  <i className="uil uil-padlock"></i>
                                </div>
                              </div>

                              <div className="mt-3">
                                <Button
                                  variant="info"
                                  className="w-100 rounded-pill"
                                  type="submit"
                                >
                                  Iniciar Sesión
                                </Button>
                              </div>

                              <div className="mt-4 text-center text-white">
                                Olvidaste tu contraseña?{" "}
                                <Link href="/resetPassword">
                                  <a className="text-decoration-none text-info">
                                    Recupera tu acceso
                                  </a>
                                </Link>
                              </div>
                            </Form>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <ToastContainer />
      </div>
    </LoginLayout>
  );
};

export default Login;