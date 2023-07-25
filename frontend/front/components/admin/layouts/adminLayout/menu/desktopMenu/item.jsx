import { useRouter } from 'next/router'
import Link from 'next/link'

const Item = ({title, path, icon}) => {

    const { pathname: currentPage } = useRouter() 
    const isSelected = path === currentPage

    return (
        <>
            <Link href={path} >
                <a className='text-decoration-none'>
                    <div className={`${isSelected? 'selected' : 'not-selected'} p-1 d-flex position-relative cursor-pointer`}>
                        {isSelected && <div className='y-marker'></div>}
                        <div className={`mx-3 y-center ${isSelected? 'filter-blue' : 'filter-gray'}`}>
                            {icon}
                        </div> 
                        <span className='text'>{title}</span>
                    </div>
                </a>
            </Link>
            <style jsx>{`
                .text {
                    font-weight: 400; 
                    font-size: 15px;
                }
                .selected {
                    background: #D8FDFF;
                    color: blue;
                }
                .not-selected {
                    background: white;
                    color: gray;
                }
                .y-marker {
                    position: absolute;
                    background: blue;
                    height: 100%;
                    width: 4px;
                    border-radius: 0 25px 25px 0;
                    left: 0;
                    top: 0;
                }
            `}</style>
        </>
    )

}

export default Item