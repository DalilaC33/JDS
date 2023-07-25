import { useEffect, useState } from "react";

const PaginationUsePost = ({ getPerPageObject, frameSize, size,request}) => {
  const { previousPage, actualPage, nextPage, totalPages } = getPerPageObject?.data || {};
  //let frame_size = totalPages < 3 ? totalPages : (frameSize ? frameSize : 3);
  const [frame, setFrame] = useState([]);

  const fetch = (page) => {
    page !== actualPage && getPerPageObject.fetch(request,page, size);
  };

  // Credit: https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
  function range(size, startAt = 0) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }

  useEffect(() => {
    let frame_size = totalPages < 3 ? totalPages : (frameSize ? frameSize : 3);
    setFrame(range(frame_size, 0))
  }, [totalPages]);

  useEffect(() => {
    if (!frame.includes(actualPage)) {
      actualPage > frame[frame.length - 1] &&
        setFrame(range(frame.length, frame[0] + 1));
      actualPage < frame[0] && setFrame(range(frame.length, frame[0] - 1));
    }
  }, [actualPage]);

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={
              previousPage != null ? "page-item" : "page-item disabled"
            }
          >
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => fetch(previousPage)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {frame.map((elem, index) => (
            <li className="page-item" key={index} onClick={() => fetch(elem)}>
              <a
                className={
                  actualPage === elem ? "page-link isSelected" : "page-link"
                }
                href="#"
              >
                {elem + 1}
              </a>
            </li>
          ))}
          <li className={nextPage != null ? "page-item" : "page-item disabled"}>
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => fetch(nextPage)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        a:focus {
          box-shadow: none;
        }
        .isSelected {
          background: #8bf;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default PaginationUsePost;