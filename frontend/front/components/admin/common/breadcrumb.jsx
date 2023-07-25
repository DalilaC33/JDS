import Link from 'next/link'

/**
 * 
 * @param {links} es un arreglo en dos dimensiones, el o los arreglos internos tienen el Nombre del link y su path ['name', 'path']
 * @param {currentPage} es el nombre de la página, es listada pero inhabilitada
 * @returns un breadcrum de bootstrap pero con atributos personalizados 
 */
const Breadcrumb = ({links, currentPage}) => {
    return (
        <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
                {links.map((link, index)=>
                    <li className='breadcrumb-item' key={index}>
                        <Link href={link[1]}>
                            <a className='text-decoration-none text-black'>{link[0]}</a>
                        </Link>
                    </li>
                )}
                <li className='breadcrumb-item active' aria-current="page">{currentPage}</li>
            </ol>
        </nav>
    )
}

export default Breadcrumb