import Link from "next/link"
import { FiArrowLeft } from 'react-icons/fi'

const LoginButton = () => {
    return (
        <div className="d-flex">
            <Link href='/auth/login'>
                <a className='btn btn-info text-decoration-none'>
                    <FiArrowLeft size={25} /> Volver
                </a>
            </Link>
            <style jsx>{`
                div {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                }
            `}</style>
        </div>
    )
}

export default LoginButton