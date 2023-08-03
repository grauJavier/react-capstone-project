import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useEffect } from 'react';
import CHILE from '../redux/locationData';
import CitiesList from './CitiesList';

const Cities = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const region = useParams();
  const REGION_DATA = CHILE[region.name];
  const latitude = REGION_DATA.capital.lat;
  const longitude = REGION_DATA.capital.lon;

  const airQualityData = useSelector(
    (state) => state.airQuality.location[`${latitude},${longitude}`],
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
    default:
      airQuality = 'loading';
      break;
  }

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav__back-arrow">
          <MdArrowBackIosNew />
        </Link>
        <h1 className="nav__title">Air Pollution - Chile - Cities</h1>
      </nav>
      <header className="header">
        <img src={REGION_DATA.img} alt={REGION_DATA.name_short} className="header__img" />
        <div>
          <h3 className="header__name">
            {REGION_DATA.reg_nr}
            {' '}
            {REGION_DATA.name}
          </h3>
          <h4 className="header__stats">
            Air Quality ·
            {airQuality}
          </h4>
        </div>
      </header>
      <main className="main">
        <div className="main__subtitle-container">
          <h2 className="main__subtitle">Stats by City</h2>
        </div>
        <section className="main__section">
          <CitiesList region={region.name} cities={REGION_DATA.cities} />
        </section>
      </main>
    </>
  );
};

export default Cities;
