import Link from "next/link"
import { Button } from "react-bootstrap"
import { FiArrowLeft } from "react-icons/fi"

const Solicitud = ({ children }) => {
  return (
    <>
      <div className="conexion_container">
        <div className="nav">
          <div className="nav_icon">
            <img src="/logo.svg" alt="logo" width={52} />
          </div>
          <span className="brand">Ñande Y</span>
          <div className="nav-item ms-3">
            <Link href="/auth/login">
              <Button size="sm" className="nav-link text-white">
                <FiArrowLeft size={20} />
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
        <div className="y-scroll">{children}</div>
      </div>
      <style jsx>{`
        .conexion_container {
          height: 100vh;
          width: 100%;
          background: url("/fondo.jpeg");
          background-repeat: no-repeat;
          background-position: center center;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
        }
        .nav {
          background: #8bf;
          position: relative;
          height: 3.5em;
          z-index: 30;
          display: flex;
          align-items: center;
        }

        .nav_icon {
          filter: brightness(0) invert(1);
          padding: 0 1em;
        }

        .brand {
          font-size: 23px;
          font-weight: 600;
          color: black;
        }
        .y-scroll::-webkit-scrollbar {
          display: none;
          overflow-y: scroll;
        }
      `}</style>
    </>
  )
}

export default Solicitud
