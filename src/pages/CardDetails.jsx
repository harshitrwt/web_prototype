import { useLocation, useParams, useNavigate, Link } from "react-router-dom";

import { useEffect, useState } from 'react';

import "./CardDetails.css"

function CardDetails() {
  const { state } = useLocation();       // state.card came from Dashboard
  const { id } = useParams();            // /cards/:id
  const navigate = useNavigate();


  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  // 🚨 If the user refreshed the page there will be no state;
  // in real apps fetch the card from your store or API.
  if (!state?.card) {
    return (
      <div className="p-6">
        <p className="mb-4">Card not found (maybe you refreshed?).</p>
        <button onClick={() => navigate("/")} className="underline">
          Back to dashboard
        </button>
      </div>
    );
  }

  const { title: rawTitle, description: rawDesc, subject, message } = state.card;
  console.log("Loaded file from card:", state.card.file);

  const title = rawTitle ?? subject;
  const description = rawDesc ?? message;

  return (
    <main>
      <div style={styles.page}>
        <div style={{ ...styles.navbar, height: isMobile ? '60px' : '80px', padding: isMobile ? '8px 12px' : '12px 20px' }}>
          <div style={styles.navLeft}>
            <div style={styles.logoTitleWrapper}>
              <img
                src="/imglogo.png"
                alt="Logo"
                style={{ ...styles.logo, width: isMobile ? '50px' : '75px', height: isMobile ? '50px' : '75px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
              <div style={styles.hindiTitle}>
                <div style={{ fontSize: isMobile ? '12px' : '21px', width: isMobile ? '170px' : 'auto' }}>ठोसावस्था भौतिकी प्रयोगशाला बुलेटिन बोर्ड /</div>
                <div style={{ fontSize: isMobile ? '10px' : '21px' }}>Solid State Physics Laboratory Bulletin Board</div>
              </div>
            </div>
          </div>

        </div>
        <div style={styles.headerRow}>
          <Link to="/" style={{ ...styles.indexLink, textDecoration: 'none', color: 'inherit' }} >
            🏠︎ Board Index
          </Link>
        </div>

        <div style={styles.forumHeader}>Discription</div>


        <div className="abc" style={{ maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
          <p><strong>Subject:</strong>{title}</p>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <p><strong>Message:</strong></p>
            {description.split('\n').map((line, idx) => {
              const match = line.match(/\[(.*?)\]\(#uploaded-file\)/);
              if (match && state.card.file) {
                return (
                  <div key={idx}>
                    📎 <a
                      href={state.card.file.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'blue', textDecoration: 'underline' }}
                    >
                      {match[1]}
                    </a>
                  </div>
                );
              } else {
                return <div key={idx}>{line}</div>;
              }
            })}
          </div>





        </div>
        <div className="back">
          <button onClick={() => navigate(-1)} className="underline">
            ← Back
          </button>
        </div>

        <footer>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '0px 0px 0px 10px' }}>
            <span style={{ fontWeight: 'bold' }}>WHO IS ONLINE</span>
            <span style={{ borderBottom: '1px solid grey', width: '100%' }}></span>
            <span>Users browsing this forum: 1 registered users and no guest</span>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px', padding: '0px 0px 0px 10px' }}>
            <span style={{ fontWeight: 'bold' }}>FORUM PERMISSIONS</span>
            <span style={{ borderBottom: '1px solid grey', width: '100%' }}></span>
            <span>You <strong>cannot</strong> post new topics in the forum</span>
            <span>You <strong>cannot</strong> reply to topics in the forum</span>
            <span>You <strong>cannot</strong> edit your posts in the forum</span>
            <span>You <strong>cannot</strong> delete your posts in the forum</span>
          </div>
          <div style={styles.belowboardLink}> 🏠︎ Board Index</div>
        </footer>

      </div>
    </main>
  );
}

const styles = {
  page: {
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    padding: '0',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to right, #0d1a4a, #01447D)',
    height: '80px',
    color: '#fff',
    padding: '12px 20px',
    fontFamily: 'monospace',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '1px solid #000',
  },
  navLeft: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  logoTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  logo: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
  },
  hindiTitle: {
    marginTop: "10px",
    fontSize: '21px',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: '1.2',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
  },
  forumHeader: {
    border: '1px solid #000',
    padding: '5px 20px',
    fontWeight: 'bold',
    fontSize: '20px',
    border: '2px solid #000',
    marginBottom: '20px',
    marginTop: '40px',
    color: '#fff',
    justifyContent: 'center',
    display: 'flex',
    background: 'linear-gradient(to right, #0d1a4a, #3c76b9)',
  },
  headerRow: {
    display: 'flex',
    height: '60px',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    border: '1px solid #000',
    backgroundColor: '#F1F1F1',
    marginBottom: '10px',
  },
  indexLink: {
    fontSize: '20px',
    cursor: 'pointer',
  },
  belowboardLink: {
    backgroundColor: '#f0f0f0',
    color: 'black',
    padding: '10px 20px',
    height: '50px',
    display: 'flex',
    font: 'bold',
    fontSize: '16px',
    border: '1px solid black',
    marginTop: '20px',

  }
};

export default CardDetails;