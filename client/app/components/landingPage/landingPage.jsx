import React, { useState } from 'react';
import LoginComponent from '../login/login';

const LandingPage = () => {
  const showModal = false;

  return (
    <div className="home-container">
      <div className="bg-img container-fluid"></div>
      <div className="content container text-center">
        <section>
          <div className="row home-container__row">
            <div className="col home-container__text-section">
              <h2>No longer loose any vital documents</h2>
              <p>
                Keep your documents in a truly secured space that provides you
                with features that help your ideas come to live.
              </p>
            </div>
            <div className="card col home-container__card"></div>
          </div>
        </section>
        <section>
          <div className="row home-container__row flex-row-reverse">
            <div className="col home-container__text-section">
              <h2>Keep your notes in one place</h2>
              <p>
                Have access to your documents anywhere you are and update on the
                file. You can mange your document permission with one click and
                share with friends
              </p>
            </div>
            <div className="card col home-container__card"></div>
          </div>
        </section>
      </div>
      <footer className="home-footer container-fluid">
        <div className="home-footer__text">
          <p>Copyright &copy; 2020. All rights reserved</p>
        </div>
      </footer>
      <LoginComponent showModal={showModal} />
    </div>
  );
};

// https://source.unsplash.com/EeS69TTPQ18
export default LandingPage;
