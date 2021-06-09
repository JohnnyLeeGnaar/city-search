import React from "react";

function TableRowExpanded(props) {
  const { isActive, setIsActive } = props;

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
    <tr className='chunky'
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <td>
        <div>
          <div>
            <h3>{city.name}</h3>
            <hr />
            <p>{city.description}</p>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableRowExpanded;
