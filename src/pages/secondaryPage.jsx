import { Link , useNavigate } from 'react-router-dom';
import { MdOutlineMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';
import JumpToForum from './JumpTo';
import './loginPage.css';

function SecondaryPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cghsCards, setCghsCards] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [defaultOptions, setDefaultOptions] = useState([
    "CGHS Latest Guidelines",
    "CGHS Rate List updated",
    "CGHS own Diagnostic Laboratories",
    "CGHS Empanelled Hospitals & Diagnostic Centres - Delhi / NCR",
    "CGHS COVID-19 Orders",
    "MedicL Claim Forms",
    "CGHS Ayush - Ayurvedic Treatment",
    "CGHS - Miscellaneous Orders",
    "CGHS Simplification of Procedure for Treatment at Empanelled Private Hospitals",
    "CGHS Forms",
    "CGHS Rate List",
    "CGHS Revised Subscription"
  ]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const fetchCards = () => {
      const all = JSON.parse(localStorage.getItem("allTopics") || "[]");
      const filtered = all.filter(card => card.section === "CGHS");
      setCghsCards(filtered);
    };
    fetchCards();
    window.addEventListener('focus', fetchCards);
    return () => window.removeEventListener('focus', fetchCards);
  }, []);

  const handleDelete = (idToDelete) => {
    const all = JSON.parse(localStorage.getItem("allTopics") || "[]");
    const updated = all.filter((item) => item.id !== idToDelete);
    localStorage.setItem("allTopics", JSON.stringify(updated));
    setCghsCards(updated.filter((card) => card.section === "CGHS"));
  };

  const lastModifiedBy = "saketmital";
  const lastModifiedDate = new Date("2025-06-19T14:30:00Z");

  return (
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
        <div style={styles.navRight}>
          {isLoggedIn ? (
            <button style={styles.btnlogin} disabled>Admin</button>
          ) : (
            <button style={styles.btnlogin} onClick={() => navigate('/login')}>Login</button>
          )}
        </div>
      </div>

      <div style={styles.headerRow}>
        <span style={styles.indexLink}>🏠︎ Board Index</span>
      </div>

      <div style={styles.content}>
        <div style={styles.subcontent}>
          <p style={styles.paragraph}>सीजीएचएस / CGHS</p>
          <div style={styles.actionRow}>
            {isLoggedIn && (
              <button
                style={styles.newTopicButton}
                onClick={() => navigate('/review', { state: { section: 'CGHS' } })}
              >
                New Topic / नया विषय
              </button>
            )}
            <input
              type="text"
              placeholder="Search topics / विषय खोजें"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <div style={styles.forumHeader}>Professional Options</div>

      <div style={styles.gridContainer}>
        {cghsCards.map((card) => (
          <div key={card.id} style={styles.card}>
            <div style={styles.iconWrapper}>
              <div style={styles.iconCircle}>
                <MdOutlineMenu style={styles.iconStyled} />
              </div>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setCardToDelete(card.id);
                  setShowDeleteConfirm(true);
                }}
                className='deletebtn'
                style={{
                  border: '2px solid white',
                  borderRadius: '50%',
                  color: 'black',
                  cursor: 'pointer',
                  fontSize: '18px',
                  marginLeft: '30vh',
                  marginTop: '-40px',
                  marginBottom: '30px',
                }}
                title="Delete"
              >
                🗑
              </button>
            )}

            {showDeleteConfirm && (
              <div style={styles.modalOverlay}>
                <div style={styles.modalBox}>
                  <h3 style={styles.modalTitle}>Are you sure?</h3>
                  <p style={{ color: 'black' }}>This will permanently delete this post.</p>
                  <div style={styles.modalButtons}>
                    <button
                      onClick={() => {
                        handleDelete(cardToDelete);
                        setShowDeleteConfirm(false);
                        setCardToDelete(null);
                      }}
                      style={styles.deleteButton}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setCardToDelete(null);
                      }}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Link key={card.id} to={`/cards/${card.id}`} state={{ card }} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={styles.titleBlock}>
              <div style={styles.title}>{card.subject}</div>
              <div style={styles.topics}>{card.message}</div>
              <div style={styles.topics}>
                Posted on {new Date(card.timestamp).toLocaleDateString("en-IN", {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </div>
            </div>
            </Link>
          </div>
        ))}

        {defaultOptions.filter(option =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((option, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconWrapper}>
              <div style={styles.iconCircle}>
                <MdOutlineMenu style={styles.iconStyled} />
              </div>
            </div>
            <div style={styles.titleBlock}>
              <div style={styles.title}>{option}</div>
              <div style={styles.topics}>
                Last post by <strong>{lastModifiedBy}</strong> on <em>{lastModifiedDate.toLocaleDateString("en-IN", {
                  year: "numeric", month: "long", day: "numeric"
                })}</em>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <div style={styles.belowContent}>
          <button style={styles.newTopicButton} onClick={() => navigate('/review', { state: { section: 'CGHS' } })}>
            New Topic / नया विषय
          </button>
          <span style={styles.belowpara}>12 topics Page 1 of 1</span>
        </div>
      )}

      <JumpToForum />

      <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>WHO IS ONLINE</span>
        <span style={{ borderBottom: '1px solid grey', width: '100%' }}></span>
        <span>Users browsing this forum: No registered users and 1 guest</span>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>FORUM PERMISSIONS</span>
        <span style={{ borderBottom: '1px solid grey', width: '100%' }}></span>
        <span>You <strong>cannot</strong> post new topics in the forum</span>
        <span>You <strong>cannot</strong> reply to topics in the forum</span>
        <span>You <strong>cannot</strong> edit your posts in the forum</span>
        <span>You <strong>cannot</strong> delete your posts in the forum</span>
      </div>

      <div style={styles.belowboardLink}> 🏠︎ Board Index</div>
    </div>
  );
}




const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: '20px 30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    maxWidth: '320px',
    width: '90%',
  },

  modalTitle: {
    marginBottom: '10px',
    color: 'black',
  },

  modalButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },

  deleteButton: {
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  cancelButton: {
    backgroundColor: '#ccc',
    padding: '8px 16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
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
  belowContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  belowpara: {
    fontSize: '16px',
    color: '#333',
    marginLeft: '10px',
    alignSelf: 'center',
    font: 'semibold',
  },
  boardindx: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  jumpto: {
    display: 'inline-block',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '6px solid white',
    marginTop: '2px'
  },
  logo: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
  },
  newTopicButton: {
    background: 'linear-gradient(to right, #0d1a4a, #01447D)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  belowboardLink: {
    backgroundColor: '#f0f0f0',
    color: 'black',
    padding: '10px 20px',
    height: '100px',
    display: 'flex',
    font: 'bold',
    fontSize: '16px',
    border: '1px solid black',
    marginTop: '20px',

  },
  paragraph: {
    fontSize: '26px',
    fontWeight: 'bold',
    marginBottom: '2px',
    color: '#333',
  },

  searchInput: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minWidth: '100px',
    margin: '10px',
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
  navRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '12px',
  },
  btnlogin: {
    backgroundColor: '#01447C',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchIcon: {
    fontSize: '18px',
    cursor: 'pointer',
  },
  navSeparator: {
    borderBottom: '2px solid #000',
    marginBottom: '10px',
    border: '1px solid #000',
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
  time: {
    fontSize: '14px',
    marginTop: '4px',
  },
  gridContainer: {
    border: '1px solid #000',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px 20px 40px',
    backgroundColor: '#F1F1F1',
  },
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '2px solid #000',
    padding: '20px',
    borderRadius: '8px',
    height: '120px',
    color: '#fff',
    background: 'linear-gradient(to right, #0d1a4a, #01447D)',
    cursor: 'pointer',
  },
  iconWrapper: {
    display: 'flex',

    width: '100%',
  },
  iconCircle: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  iconStyled: {
    fontSize: '20px',
    color: '#01447C',
    cursor: 'pointer',
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '15px',
    textDecoration: 'underline',
    color: '#fff',
  },
  topics: {
    fontSize: '13px',
    marginTop: '4px',
    color: '#e6ffe6',
  },
};

export default SecondaryPage;
