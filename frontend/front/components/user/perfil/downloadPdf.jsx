import { GrDocumentPdf } from 'react-icons/gr'
import {  toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const AWS = require("aws-sdk")

const DownloadPdf = ({ text, fileKey }) => {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION,
      })
    
      const toastError = (message) => {
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    
      const toastInfo = (message) => {
        toast.info(message, {
          position: toast.POSITION.TOP_RIGHT, toastId: 'success1',
        })
    }
    const handlefileDownload = (fileKey, text) => {
        s3.getObject(
          { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: fileKey },
          (err, data) => {
            if (err) {
              toastError("No se encontro el archivo") //return console.log("No se encontro el archivo");
            } else {
              toastInfo("Se ha iniciado la descarga del archivo")
              const reader = new FileReader()
              // crea un Blob del PDF Stream
              const file = new Blob([data.Body], { type: "application/pdf" })
              //Construye URL del archivo
              const fileURL = URL.createObjectURL(file)
              //Open the URL on new Window
    
              //creando un elemento invisible
              const url = window.URL.createObjectURL(new Blob([data.Body]))
              const link = document.createElement("a")
              link.href = url
              link.setAttribute("download", text)
              document.body.appendChild(link)
              link.click()
            }
          }
        )
      }
        
    return (
        <div className='download-btn font-montserrat' onClick={() => handlefileDownload(fileKey, text)}>
            <div className='icon-container'>
                <GrDocumentPdf size={30}/>
            </div>
            {text}
            <style jsx>{`
                .download-btn {
                    display: flex;
                    background: #fff;
                    height: 90px;
                    width: 100%;
                    border: 0.5px solid #999;
                    border-radius: 5px;
                    font-size: 15px;
                    align-items: center;
                    cursor: pointer;
                }
                .icon-container {
                    display: flex;
                    height: 100%;
                    border-right: 0.5px solid #999;
                    align-items: center;
                    margin: 0 10px;
                    width: 20%;
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}

export default DownloadPdf