import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { BsArrowRightCircle } from 'react-icons/bs';
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

        dispatch(fetchAirQuality({ lat: latitude, lon: longitude }));
      }
    };

    fetchAirQualityData();
    // eslint-disable-next-line
  }, []);

  const AirQualityData = (latitude, longitude) => useSelector((state) => state.airQuality.location[`${latitude},${longitude}`]);

  const output = region.slice(1).map((regionKey) => {
    const { img } = CHILE[regionKey];
    const nameShort = CHILE[regionKey].name_short;
    const latitude = CHILE[regionKey].capital.lat;
    const longitude = CHILE[regionKey].capital.lon;

    const airQualityDataFromStore = AirQualityData(latitude, longitude);

    const airQualityValue = airQualityDataFromStore?.list[0]?.main?.aqi;
    let airQuality = '';

    switch (airQualityValue) {
      case 1:
        airQuality = 'Good';
        break;
      case 2:
        airQuality = 'Fair';
        break;
      case 3:
        airQuality = 'Moderate';
        break;
      case 4:
        airQuality = 'Poor';
        break;
      case 5:
        airQuality = 'Very Poor';
        break;
      default:
        airQuality = 'loading';
        break;
    }

    if (!airQualityDataFromStore) {
      airQuality = <i>loading</i>;
    }

    return (
      <Link to={`/details/${regionKey}/`} key={regionKey} className="region-card">
        <BsArrowRightCircle />
        <img src={img} className="region-card__img" alt={nameShort} />
        <div className="region-card__stats-container">
          <h3 className="region-card__name">{nameShort}</h3>
          <h4 className="region-card__stats">
            {`Air Quality · ${airQuality}`}
          </h4>
        </div>
      </Link>
    );
  });

  return output;
};

export default RegionsCards;
