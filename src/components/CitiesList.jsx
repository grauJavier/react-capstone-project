import { Link } from 'react-router-dom';
import { BsArrowRightCircle } from 'react-icons/bs';
import './styles/CitiesList.css';

const CitiesList = ({ region, cities }) => {
  const CITIES = Object.keys(cities);
  const output = [];

  CITIES.forEach((cityName) => {
    output.push(
      <Link to={`/details/${region}/${cityName}/`} key={cityName} className="cities-list__item">
        <h3>{cityName}</h3>
        <BsArrowRightCircle />
      </Link>,
    );
  });

  return output;
};

export default CitiesList;
