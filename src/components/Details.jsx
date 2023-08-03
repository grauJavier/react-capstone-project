import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchAirQuality } from '../redux/slices/airQualitySlice';
import { useDispatch, useSelector } from 'react-redux';

import DetailsBreakdown from './DetailsBreakdown';
import CHILE from '../redux/locationData';

import './styles/Details.css';
import { MdArrowBackIosNew } from 'react-icons/md';
import { FaCity } from 'react-icons/fa';

const Details = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const dispatch = useDispatch();

  const data = useParams();
  const latitude = CHILE[data.region].cities[data.city].lat;
  const longitude = CHILE[data.region].cities[data.city].lon;

  useEffect(() => {
    const fetchAirQualityData = async () => {
      await dispatch(fetchAirQuality({ lat: latitude, lon: longitude }));
    };

    fetchAirQualityData();
  }, []);

  const airQualityData = useSelector(
    (state) => state.airQuality.location[`${latitude},${longitude}`]
  );

  const airQualityValue = airQualityData?.list[0]?.main?.aqi;
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
  }

  if (!airQualityData) {
    airQuality = <i>loading</i>;
  }

  return (
    <>
      <nav className="nav">
        <Link to={`/details/${data.region}`} className="nav__back-arrow">
          <MdArrowBackIosNew />
        </Link>
        <h1 className="nav__title">Air Pollution - Chile - Cities - Details</h1>
      </nav>
      <header className="header">
        <FaCity />
        <div>
          <h3 className="header__name">{data.city}</h3>
          <h4 className="header__stats">Air Quality · {airQuality}</h4>
        </div>
      </header>
      <main className="main">
        <div className="main__subtitle-container">
          <h2 className="main__subtitle">Component</h2>
          <h2 style={{ fontSize: '1em' }}>
            μg/m<sup>3</sup>
          </h2>
        </div>
        <section className="main__section">
          <DetailsBreakdown data={airQualityData} />
        </section>
      </main>
    </>
  );
};

export default Details;
