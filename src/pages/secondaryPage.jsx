import { useNavigate } from 'react-router-dom';
import { MdSearch, MdOutlineMenu } from 'react-icons/md';

function SecondaryPage() {
  const navigate = useNavigate();

  const options = [
    "बैठक नोट्स / Meeting Notes",
    "परियोजना प्रबंधन / Project Management",
    "रिपोर्ट निर्माण / Report Generation",
    "ग्राहक संचार / Client Communication",
    "टीम सहयोग / Team Collaboration",
    "कोड समीक्षा / Code Review",
    "बग ट्रैकिंग / Bug Tracking",
    "संसाधन आवंटन / Resource Allocation",
    "कार्य अनुसूची / Scheduling Tasks",
    "प्रदर्शन मीट्रिक / Performance Metrics"
  ];

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.logoTitleWrapper}>
            <img src="/imglogo.png" alt="Logo" style={styles.logo} />
            <div style={styles.hindiTitle}>
              विवेकानन्द अध्ययन संस्थान/<br />Material Management Group Bulletin Board
            </div>
          </div>
        </div>
      </div>


      <div style={styles.headerRow}>
        <span style={styles.indexLink}>↩ Board Index</span>
        
        <MdSearch style={styles.searchIcon} />
      </div>

      <div style={styles.content}>
        <div style={styles.subcontent}>
          <p style={styles.paragraph}>
            विषय खोजें / search one
          </p>
          <div style={styles.actionRow}>
            <button style={styles.newTopicButton}>New Topic / नया विषय</button>
            <input
              type="text"
              placeholder="Search topics / विषय खोजें"
              style={styles.searchInput}
            />
          </div>
        </div>
      </div>



      <div style={styles.forumHeader}>Professional Options</div>

      <div style={styles.gridContainer}>
        {options.map((option, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate('/review')}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#01447C')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#01447C')}
          >
            <div style={styles.iconWrapper}>
              <div style={styles.iconCircle}>
                <MdOutlineMenu style={styles.iconStyled} />
              </div>
            </div>
            <div style={styles.titleBlock}>
              <div style={styles.title}>{option}</div>
              <div style={styles.topics}>Click to review</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.belowContent}>
        <button style={styles.newTopicButton}>New Topic / नया विषय</button>
        <span style={styles.belowpara}>12 topics Page 1 of 1</span>
      </div>

      <div style={styles.boardindx}>
        <span style={styles.boardLink}>&lt; Return to Board Index</span>
        <button style={{
          ...styles.newTopicButton,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          Jump to
          <span style={styles.jumpto} />
        </button>

      </div>


      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div style={styles.belowboardLink}> Board Index</div>


    </div>
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
    backgroundColor: '#01447C',
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
  jumpto:{
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
    backgroundColor: '#01447C',
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
  color: '#333', 
  padding: '10px 20px',
  height: '100px',
  display: 'flex',
  fontWeight: '500',
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
    backgroundColor: '#01447C',
    cursor: 'pointer',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
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
