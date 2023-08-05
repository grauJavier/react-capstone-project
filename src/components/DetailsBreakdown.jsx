import './styles/DetailsBreakdown.css';
import PropTypes from 'prop-types';

const DetailsBreakdown = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) {
    return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }

  const componentsData = data.list[0].components;

  return (
    <>
      <div className="components__item">
        <h3>
          Sulfur Dioxide
          {' '}
          <span>
            (SO
            <sub>2</sub>
            )
          </span>
        </h3>
        <h3>
          {componentsData.so2}
          {' '}
          ≤ 350
        </h3>
      </div>
      <div className="components__item">
        <h3>
          Nitrogen Dioxide
          {' '}
          <span>
            (NO
            <sub>2</sub>
            )
          </span>
        </h3>
        <h3>
          {componentsData.no2}
          {' '}
          ≤ 200
        </h3>
      </div>
      <div className="components__item">
        <h3>
          Particulate Matter 10
          {' '}
          <span>
            (PM
            <sub>10</sub>
            )
          </span>
        </h3>
        <h3>
          {componentsData.pm10}
          {' '}
          ≤ 200
        </h3>
      </div>
      <div className="components__item">
        <h3>
          Particulate Matter 2.5
          {' '}
          <span>
            (PM
            <sub>2.5</sub>
            )
          </span>
        </h3>
        <h3>
          {componentsData.pm2_5}
          {' '}
          ≤ 75
        </h3>
      </div>
      <div className="components__item">
        <h3>
          Ozone
          {' '}
          <span>
            (O
            <sub>3</sub>
            )
          </span>
        </h3>
        <h3>
          {componentsData.o3}
          {' '}
          ≤ 180
        </h3>
      </div>
      <div className="components__item">
        <h3>
          Carbon Monoxide
          {' '}
          <span>(CO)</span>
        </h3>
        <h3>
          {componentsData.co}
          {' '}
          ≤ 15400
        </h3>
      </div>
      <div className="component__subtitle-container">
        <h2 className="component__subtitle">
          The following parameters do not affect the AQI calculation
        </h2>
      </div>
      <div className="components__item">
        <h3>
          Ammonia
          {' '}
          <span>
            (NH
            <sub>3</sub>
            )
          </span>
        </h3>
        <h3>
          {componentsData.nh3}
          {' '}
          ≤ 200
        </h3>
      </div>
      <div className="components__item">
        <h3>
          Nitric Oxide
          {' '}
          <span>(NO)</span>
        </h3>
        <h3>
          {componentsData.no}
          {' '}
          ≤ 100
        </h3>
      </div>
    </>
  );
};

DetailsBreakdown.defaultProps = {
  data: {
    list: [],
  },
};

DetailsBreakdown.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        components: PropTypes.shape({
          so2: PropTypes.number.isRequired,
          no2: PropTypes.number.isRequired,
          pm10: PropTypes.number.isRequired,
          pm2_5: PropTypes.number.isRequired,
          o3: PropTypes.number.isRequired,
          co: PropTypes.number.isRequired,
          nh3: PropTypes.number.isRequired,
          no: PropTypes.number.isRequired,
        }).isRequired,
      }),
    ),
  }),
};

export default DetailsBreakdown;
