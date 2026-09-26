import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">✨ VIRTUAL CREDITS ARCADE</div>
        <h1 className="hero-title">
          SPIN THE <span className="hero-gradient-text">3D LUCKY WHEEL</span>
        </h1>
        <p className="hero-desc">
          Step up to the virtual wheel! Bet your virtual credits, enjoy realistic 3D wheel physics and smooth deceleration, and win multipliers up to 10x!
        </p>
        <div className="hero-cta-group">
          <Link to="/game" className="hero-play-btn">
            <span>PLAY 3D WHEEL NOW</span>
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/register" className="hero-claim-btn">
            Claim 1,000 Free Credits
          </Link>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎡</div>
          <h3 className="feature-heading">Real 3D Three.js Engine</h3>
          <p className="feature-text">
            Dynamic metallic materials, dynamic lighting, real-time particle sparkles, and smooth ticker physics.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-heading">Server-Authoritative RNG</h3>
          <p className="feature-text">
            Cryptographically secure random generation computed on the backend server for true fairness.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🪙</div>
          <h3 className="feature-heading">100% Virtual Credits</h3>
          <p className="feature-text">
            Completely safe, entertainment-only virtual credits with free unlimited refills anytime.
          </p>
        </div>
      </section>

      {/* Multiplier Payout Table */}
      <section className="payouts-showcase">
        <h2 className="payouts-title">WHEEL MULTIPLIER PAYOUTS</h2>
        <div className="payout-cards-row">
          <div className="payout-item item-0x">
            <span className="payout-mult">0x</span>
            <span className="payout-desc">No win (4 Sectors)</span>
          </div>
          <div className="payout-item item-1x">
            <span className="payout-mult">1x</span>
            <span className="payout-desc">Return bet (1 Sector)</span>
          </div>
          <div className="payout-item item-2x">
            <span className="payout-mult">2x</span>
            <span className="payout-desc">Double bet (1 Sector)</span>
          </div>
          <div className="payout-item item-3x">
            <span className="payout-mult">3x</span>
            <span className="payout-desc">Triple bet (1 Sector)</span>
          </div>
          <div className="payout-item item-10x">
            <span className="payout-mult">10x</span>
            <span className="payout-desc">MEGA JACKPOT! (1 Sector)</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
