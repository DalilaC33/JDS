import Head from 'next/head'
import Breadcrumb from "../../../components/admin/common/breadcrumb"
import ArqueoTabla from '../../../components/Reportes/ArqueoTabla'
import "react-datepicker/dist/react-datepicker.css";
import useGet from '../../../api-config/v2/useGet'
import { useEffect, useState } from "react"


const Arqueo = () => {
    
    return (
        <>
            <Head>
                <title>Reportes</title>
            </Head>

            <h3 className='m-3 mb-1'>Reportes</h3>
            <div className='d-flex justify-content-between align-self-end'>
            <div className='p-3 font-montserrat'>
            <Breadcrumb links={[["Home", "/admin"]]} currentPage="Arqueo de Caja" />
            
            </div>
            </div>
                   <ArqueoTabla  />
        </>
    )
}

Arqueo.layout = 'AdminLayout'
export default Arqueo