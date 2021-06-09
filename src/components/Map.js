import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import geoUrl from "../svg/cro.json";

const height = 500;
const width = 500;

class Map extends React.Component {
  render() {
    const { bodyItems, changeMap, changeSearchQuery } = this.props;

    return (
      <div className="map">
        <ComposableMap
          data-tip=""
          projection="geoAlbers"
          projectionConfig={{
            parallels: [40, 50],
            center: [0, 45],
            rotate: [-16, 0],
            scale: 8000,
            translate: [width / 2, height / 2],
          }}
          style={{
            width: 500,
            height: 500,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME_1 } = geo.properties;
                    changeMap(NAME_1);
                  }}
                  onMouseLeave={() => {
                    changeMap("");
                  }}
                  onMouseDown={() => {
                    const { NAME_1 } = geo.properties;
                    changeSearchQuery(NAME_1)
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#c0855d",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {bodyItems.map((item) => (
            <Marker key={item.name} coordinates={[item.lng, item.lat]}>
              {item.population < 10000 && <circle r={4} fill="#c64d41" /> } ||
              {item.population > 10000 && <circle r={6} fill="#a43b31" /> } ||
              {item.population > 35000 && <circle r={10} fill="#90342b" /> } ||
              {item.name === 'Zagreb' && <circle r={12} fill="#551f19" /> }
            </Marker>
          ))}
        </ComposableMap>
      </div>
    );
  }
}

export default memo(Map);
