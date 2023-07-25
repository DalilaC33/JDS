import { FiPaperclip } from "react-icons/fi";

const FileInput = ({ id, file, setFile }) => {
  const handleAddFile = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="position-relative">
      <label htmlFor={`archivos${id}`}>
        <div className="d-flex">
          <div className="box1">
            <FiPaperclip size={25} />
          </div>
          <input
            type="file"
            id={`archivos${id}`}
            accept=".pdf"
            onChange={handleAddFile}
            required
          />
          <div className="box2">
            {file ? (
              <span>{file.name}</span>
            ) : (
              <span>Seleccione un archivo</span>
            )}
          </div>
        </div>
      </label>
      {file && (
        <div className="delete" onClick={() => {
          document.getElementById(`archivos${id}`).value = null;
          setFile(null)
          }}>
          X
        </div>
      )}

      <style jsx>{`
        input {
          width: 1px;
        }
        label {
          display: block;
          border-radius: 0.4rem;
          overflow: hidden;
          background: #fff;
          box-shadow: 1px 1px 2px #999;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
        .box1 {
          background: #bbb;
          padding: 0.4rem;
          display: flex;
          justify-content: center;
          width: 15%;
        }
        .box2 {
          background: #fff;
          padding-left: 1rem;
          display: flex;
          align-items: center;
          width: 85%;
        }
        .delete {
          position: absolute;
          background: #eee;
          z-index: 20;
          right: -5px;
          top: -5px;
          border-radius: 50%;
          padding: 0 8px;
          align-items: center;
          cursor: pointer;
          box-shadow: 1px 1px 2px #777;
        }
      `}</style>
    </div>
  );
};

export default FileInput;
