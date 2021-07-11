import React, { useRef, useState } from "react";
import Iframe from "react-iframe";
import Spinner from "react-spinkit";

function TableRowExpanded(props) {
  const [loading, setLoading] = useState(true);
  const { isActive, setIsActive, name } = props;
  const modal = useRef(null);

  const onButtonClick = () => {
    modal.current.className = "modal-hidden";
    setIsActive(!isActive);
  };

  const hideSpinner = () => {
    setLoading(!loading);
  };

  return (
    <tr onClick={onButtonClick}>
      <td colSpan="3">
        <div
          ref={modal}
          className={`modal ${isActive ? "modal-active" : "modal-hidden"}`}
        >
          <div className="modal-content flex-container">
            <span className="close">&times;</span>
            {loading ? (
              <Spinner name="rotating-plane" color="coral" fadeIn="none" />
            ) : null}
            <Iframe
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              url={`https://en.wikipedia.org/w/index.php?title=${name}&printable=yes`}
              id="wikiIframe"
              className="myClassname"
              display="initial"
              position="relative"
              onLoad={hideSpinner}
            />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableRowExpanded;
