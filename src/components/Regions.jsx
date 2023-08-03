import RegionsCards from './RegionsCards';
import CHILE from '../redux/locationData';

const Regions = () => {
  const locationData = CHILE.country;

  return (
    <>
      <nav className="nav">
        <h1 className="nav__title">Air Pollution - Chile - Regions</h1>
      </nav>
      <header className="header">
        <img src={locationData.img} className="header__img" alt="Chile" />
        <div>
          <h3 className="header__name">{locationData.name}</h3>
        </div>
      </header>
      <main className="main">
        <div className="main__subtitle-container">
          <h2 className="main__subtitle">Stats by Region</h2>
        </div>
        <section className="main__section">
          <RegionsCards />
        </section>
      </main>
    </>
  );
};

export default Regions;
