import React from 'react';

const Home = () => {
  return (
    <div
      css={{
        backGroundColor: '#effbf7',
        '& > * + *': {
          marginBottom: '1rem',
        },
        '& > section:nth-of-type(even)': {
          backgroundColor: '#a7dae7',
        },
        '& > *': {
          padding: '1rem',
        },
        '& ul': {
          listStylePosition: 'inside',
        },
        '& li': {
          marginBottom: '0.5rem',
        },
      }}
    >
      <header>
        <h1
          css={{
            textAlign: 'center',
          }}
        >
          FreeBici
        </h1>
        <h2
          css={{
            textAlign: 'center',
            fontSize: '1rem',
          }}
        >
          Explore, Analyze, and Optimize Your Valenbisi Experience
        </h2>
      </header>

      <section>
        <p>
          FreeBici is the all-in-one web app designed to enhance your Valenbisi
          experience. With powerful features and intuitive functionalities,
          FreeBici empowers you to make the most of your bike rides throughout
          the beautiful city of Valencia. Discover the services we provide and
          how they can revolutionize the way you explore the city on two wheels.
        </p>
      </section>

      <section>
        <h2>Heatmap</h2>
        <h3>Visualize Real-Time Availability</h3>
        <ul>
          <li>
            Color-Coded Visualization: Easily identify the availability of bikes
            at each Valenbisi station through an intuitive color-coded map.
          </li>
          <li>
            Real-Time Updates: Stay in the loop with live data that keeps you
            informed about the current number of available bikes at each
            station.
          </li>
          <li>
            Advanced Filtration: Filter stations based on the number of
            available bikes, enabling you to plan your route efficiently and
            avoid stations with low availability.
          </li>
        </ul>
      </section>

      <section>
        <h2>History</h2>
        <h3>Dive into Bike Availability Trends</h3>
        <ul>
          <li>
            Data Visualization: Visualize historical bike availability data
            through easy-to-understand charts and graphs.
          </li>
          <li>
            Interactive Animation: Take a journey through time with our animated
            playback feature, which showcases changes in bike availability over
            your selected period.
          </li>
          <li>
            Analyze and Plan: Use historical data to plan your rides better,
            ensuring you choose the most convenient times and locations for your
            Valenbisi adventures.
          </li>
        </ul>
      </section>

      <section>
        <h2>Finder</h2>
        <h3>Optimize Your Bike Routes</h3>
        <ul>
          <li>
            Efficient Pathfinding: Enter your origin and destination, and our
            smart algorithm will find the most efficient route for your bike
            ride.
          </li>
          <li>
            Optimal Connection Stations: Discover the best connecting stations
            along your route, ensuring you can change your bike every 30 minutes
            of travel and avoid additional rental fees.
          </li>
          <li>
            Time and Cost Savings: Maximize your biking efficiency, save money,
            and enjoy uninterrupted rides by leveraging our intelligent route
            optimization capabilities.
          </li>
        </ul>
      </section>

      <footer>
        <p>
          Please note that FreeBici is a non-profit project developed solely for
          educational purposes as part of a university course. It is important
          to understand the following: FreeBici is an independent project and is
          not affiliated with or endorsed by Valenbisi or any official city bike
          rental service. It is not associated with the operators or
          administrators of Valenbisi in any way. FreeBici utilizes the open API
          provided by Valenbisi to gather real-time data on bike availability,
          station locations, and other related information. This data is used
          solely for educational and demonstration purposes within the FreeBici
          app. While FreeBici strives to provide accurate and up-to-date
          information based on the data obtained from Valenbisi's open API, it
          cannot guarantee the accuracy, reliability, or completeness of the
          information displayed. The real-time data provided by Valenbisi may be
          subject to inaccuracies or delays, and FreeBici does not have control
          over the data's timeliness or accuracy. FreeBici does not offer any
          actual bike rental services, nor does it have any connection or
          affiliation with the official Valenbisi service. Any references to
          Valenbisi or its services within the FreeBici app are purely simulated
          and intended for educational demonstration purposes. FreeBici is not
          responsible for any actions taken or decisions made based on the
          information provided within the app. Users should refer to the
          official Valenbisi website or contact Valenbisi directly for accurate
          and up-to-date information regarding their bike rental services,
          terms, and conditions. Please understand that FreeBici is an academic
          project developed with the sole purpose of showcasing skills and
          knowledge acquired during the university course. It is not intended to
          replicate or replace any actual services provided by Valenbisi or any
          other bike rental service. Thank you for your understanding and for
          recognizing the educational nature of FreeBici as an independent
          project utilizing the open API of Valenbisi to gather real-time data.
        </p>
      </footer>
    </div>
  );
};

export default Home;
