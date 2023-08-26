import React from 'react';
import affiche from '../../images/affiche.png';
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section className="about-low-area section-padding2" id='about'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="about-caption mb-50">
              <div className="section-tittle mb-35">
                <h2>The 4th Conference of Applied Science and Computing in Marrakech</h2>
              </div>
              <p>The 4th Conference of Applied Science and Computing in Marrakech is a gathering of PhD students with interests in applied science and computing. Join us on November 15th as we explore the latest advancements in these fields.</p>
              <p>This conference aims to foster collaboration, share research findings, and promote innovation among scholars and researchers in various domains of applied science and computing.</p>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-10">
                <div className="single-caption mb-20">
                  <div className="caption-icon">
                    <span class="fa fa-map-marker-alt"></span>
                  </div>
                  <div className="caption">
                    <h5>Where</h5>
                    <p>Marrakech, Morocco</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-10">
                <div className="single-caption mb-20">
                  <div className="caption-icon">
                    <span class="fa fa-clock"></span>
                  </div>
                  <div className="caption">
                    <h5>When</h5>
                    <p>November 09, 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{marginTop:"4vh"}}>
            <Link to="/apply" className="btn btn-primary button" style={{color: '#ffffff'}}>Register Now</Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="about-img">
              <div className="d-none d-lg-block">
                <img src={affiche} alt="Conference Venue" style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
