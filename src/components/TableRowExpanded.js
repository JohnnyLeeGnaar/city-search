import React, { useRef } from "react";

function TableRowExpanded(props) {
  const { isActive, setIsActive, name } = props;
  const modal = useRef(null);

  const onButtonClick = () => {
    modal.current.className = "modal-hidden";
    setIsActive(!isActive);
  };

  const city = {
    name: "Bjelovar",
    description: `Bjelovar je grad u Hrvatskoj, središte Bjelovarsko-bilogorske županije i Bjelovarsko-križevačke biskupije. 
      Jedan je od mlađih gradova u Hrvatskoj, nastao 1756. godine, odlukom carice Marije Terezije. 
      Planski je građen kao poligon i upravno sjedište Križevačke i Đurđevačke graničarske pješačke pukovnije. 
      Ima pravilnu kvadratnu strukturu ulica u središtu grada. U gradu postoji višestoljetna tradicija proizvodnje mlijeka i sireva pa se Bjelovar ponekad naziva i „gradom sira”. 
      Rukometni klub Bjelovar osvojio je naslov europskog prvaka 1972. i desetak naslova prvaka države. 
      Zahvaljujući pionirskom djelovanju Zagonetačkog društva »Čvor« Bjelovar je izrastao u hrvatsku prijestolnicu zagonetaštva, zadobivši naziv enigmopolisa. `,
  };

  return (
    <tr onClick={onButtonClick}>
      <td colSpan="3">
        <div
          ref={modal}
          className={`modal ${isActive ? "modal-active" : "modal-hidden"}`}
        >
          <h3 className='city-detail-header'>{city.name}</h3>
          <div className="modal-content flex-container">
            <span className="close" >
              &times;
            </span>
            <p className="flex-item">{city.description}</p>
            <img src="https://upload.wikimedia.org/wikipedia/hr/9/9d/Bjelovar_%28grb%29.gif" />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableRowExpanded;
