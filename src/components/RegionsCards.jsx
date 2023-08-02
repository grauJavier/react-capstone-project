import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAirQuality } from '../redux/slices/airQualitySlice';

import CHILE from '../redux/locationData';
import './styles/RegionsCards.css';

const RegionsCards = () => {
  const dispatch = useDispatch();
  const region = Object.keys(CHILE);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      for (let i = 1; i < region.length; i += 1) {
        const latitude = CHILE[region[i]].capital.lat;
        const longitude = CHILE[region[i]].capital.lon;

        await dispatch(fetchAirQuality({ lat: latitude, lon: longitude }));
      }
    };

    fetchAirQualityData();
  }, []);

  const output = region.slice(1).map((regionKey) => {
    const { img, reg_nr, name } = CHILE[regionKey];
    const latitude = CHILE[regionKey].capital.lat;
    const longitude = CHILE[regionKey].capital.lon;

    const airQualityData = useSelector(
      (state) => state.airQuality.location[`${latitude},${longitude}`]
    );

    const airQualityValue = airQualityData?.list[0]?.main?.aqi;

    return (
        <Link to={`/cities/${regionKey}`} key={regionKey} className="region-card">
          <img src={img} className="region-card__img" alt={name} />
          <div>
            <h3 className="region-card__name">
              {reg_nr} {name}
            </h3>
            <h4 className="region-card__stats">Air Quality: {airQualityValue}</h4>
          </div>
        </Link>
    );
  });

  return output;
};

export default RegionsCards;
