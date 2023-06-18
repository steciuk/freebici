import 'src/pages/Home/Home.css';

import React from 'react';
import finderPng from 'src/assets/screenshots/finder.png';
import heatmapPng from 'src/assets/screenshots/heatmap.png';
import historyPng from 'src/assets/screenshots/historic.png';

const Home = () => {
  return (
    <div className="home">
      <div className="home-wrapper">
        <header>
          <div className="home-header__title-box">
            <div className="home-header__line" />
            <h1>FreeBici</h1>
            <div className="home-header__line" />
          </div>
          <h2>Explore, Analyze, and Optimize Your Valenbisi Experience</h2>
        </header>

        <section>
          <p>
            FreeBici is the all-in-one web app designed to enhance your
            Valenbisi experience. With powerful features and intuitive
            functionalities, FreeBici empowers you to make the most of your bike
            rides throughout the beautiful city of Valencia. Discover the
            services we provide and how they can revolutionize the way you
            explore the city on two wheels.
          </p>
        </section>

        <section>
          <div className="home-section-text">
            <div className="home-section-text__head">
              <h2>Heatmap</h2>
              <h3>Visualize Real-Time Availability</h3>
            </div>
            <ul>
              <li>
                <h4>Color-Coded Visualization</h4>
                Easily identify the availability of bikes at each Valenbisi
                station through an intuitive color-coded map.
              </li>
              <li>
                <h4>Real-Time Updates</h4>
                Stay in the loop with live data that keeps you informed about
                the current number of available bikes at each station.
              </li>
              <li>
                <h4>Advanced Filtration</h4>
                Filter stations based on the number of available bikes, enabling
                you to plan your route efficiently and avoid stations with low
                availability.
              </li>
            </ul>
          </div>
          <div className="home-section-image-wrapper">
            <img src={heatmapPng} alt="heatmap" />
          </div>
        </section>

        <section>
          <div className="home-section-image-wrapper home-section-image-wrapper__big">
            <img src={historyPng} alt="history" />
          </div>
          <div className="home-section-text">
            <div className="home-section-text__head">
              <h2>History</h2>
              <h3>Dive into Bike Availability Trends</h3>
            </div>
            <ul>
              <li>
                <h4>Data Visualization</h4>
                Visualize historical bike availability data through
                easy-to-understand visualization.
              </li>
              <li>
                <h4>Interactive Animation</h4>
                Take a journey through time with our animated playback feature,
                which showcases changes in bike availability over the available
                period.
              </li>
              <li>
                <h4>Analyze and Plan</h4>
                Use historical data to plan your rides better, ensuring you
                choose the most convenient times and locations for your
                Valenbisi adventures.
              </li>
            </ul>
          </div>
          <div className="home-section-image-wrapper home-section-image-wrapper__small">
            <img src={historyPng} alt="history" />
          </div>
        </section>

        <section>
          <div className="home-section-text">
            <div className="home-section-text__head">
              <h2>Finder</h2>
              <h3>Optimize Your Bike Routes</h3>
            </div>
            <ul>
              <li>
                <h4>Efficient Pathfinding</h4>
                Enter your origin and destination, and find the most efficient
                route for your bike ride.
              </li>
              <li>
                <h4>Optimal Connection Stations</h4>
                Discover the best connecting stations along your route, ensuring
                you can change your bike every 30 minutes of travel and avoid
                additional rental fees.
              </li>
              <li>
                <h4>Time and Cost Savings</h4>
                Maximize your biking efficiency, save money, and enjoy
                uninterrupted rides by leveraging OpenStreetMap route
                optimization capabilities.
              </li>
            </ul>
          </div>
          <div className="home-section-image-wrapper">
            <img src={finderPng} alt="finder" />
          </div>
        </section>

        <footer className="home-footer">
          <p>
            Please note that FreeBici is a non-profit project developed solely
            for educational purposes as part of a university course. FreeBici is
            provided "as is" without any warranty. While efforts have been made
            to ensure the accuracy and reliability of the information and
            services provided, we cannot guarantee their completeness or
            suitability for any purpose.
          </p>
          <div>
            <h5>Valenbisi disclaimer</h5>
            <ul>
              <li>
                FreeBici is an independent project and is not affiliated with or
                endorsed by Valenbisi or any official city bike rental service.
                It is not associated with the operators or administrators of
                Valenbisi in any way.
              </li>
              <li>
                FreeBici utilizes the open API provided by Valenbisi to gather
                real-time data on bike availability, station locations, and
                other related information. This data is used solely for
                educational and demonstration purposes within the FreeBici app.
              </li>
              <li>
                While FreeBici strives to provide accurate and up-to-date
                information based on the data obtained from Valenbisi's open
                API, it cannot guarantee the accuracy, reliability, or
                completeness of the information displayed. The real-time data
                provided by Valenbisi may be subject to inaccuracies or delays,
                and FreeBici does not have control over the data's timeliness or
                accuracy.
              </li>
              <li>
                FreeBici does not offer any actual bike rental services, nor
                does it have any connection or affiliation with the official
                Valenbisi service.
              </li>
              <li>
                FreeBici is not responsible for any actions taken or decisions
                made based on the information provided within the app. Users
                should refer to the official Valenbisi website or contact
                Valenbisi directly for accurate and up-to-date information
                regarding their bike rental services, terms, and conditions.
              </li>
              <li>
                FreeBici is not intended to replicate or replace any actual
                services provided by Valenbisi or any other bike rental service.
              </li>
              <li>
                FreeBici does not store any personally identifiable information,
                user or Valenbisi data. It operates as a client-side
                application, utilizing Valenbisi API for real-time data
                retrieval and processing during runtime. No data is persisted
                beyond the scope of the user's current session.
              </li>
            </ul>
          </div>
          <div>
            <h5>OpenStreetMap disclaimer</h5>
            <ul>
              <li>
                Mapping data used by FreeBici comes from{' '}
                <a
                  className="generic-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.openstreetmap.org/copyright"
                >
                  OpenStreetMap
                </a>
                .
              </li>
              <li>
                Mapping data used by FreeBici is made available under the{' '}
                <a
                  className="generic-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://opendatacommons.org/licenses/odbl/1.0/"
                >
                  Open Database License
                </a>
                . Any rights in individual contents of the data used are
                licensed under the{' '}
                <a
                  className="generic-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://opendatacommons.org/licenses/dbcl/1.0/"
                >
                  Database Contents License
                </a>
                .
              </li>
              <li>
                FreeBici uses the{' '}
                <a
                  className="generic-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://operations.osmfoundation.org/policies/nominatim/"
                >
                  OSM's Nominatim API
                </a>{' '}
                for geocoding purposes.
              </li>
              <li>
                FreeBici does not store any personally identifiable information,
                user or OpenStreetMap data. It operates as a client-side
                application, utilizing OpenStreetMap APIs for real-time data
                retrieval and processing during runtime. No data is persisted
                beyond the scope of the user's current session.
              </li>
              <li>
                To keep the FreeBici service up and running, please use the
                service responsibly, avoid overusing the service in order to
                prevent it from being blocked by OpenStreetMap.
              </li>
            </ul>
          </div>
          <div>
            <h5>Historic Valenbisi data disclaimer</h5>
            <ul>
              <li>
                Historic Valenbisi data used by FreeBici comes from{' '}
                <a
                  className="generic-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/ceferra/valenbici"
                >
                  ceferra/valenbici
                </a>{' '}
                github repository.
              </li>
              <li>
                FreeBici is not affiliated with, endorsed by or associated with
                the owner of the repository.
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
