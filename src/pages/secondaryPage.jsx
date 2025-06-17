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

        <div style={styles.navRight}>
          <button style={styles.btnlogin} onClick={() => navigate('/login')}>Login</button>
          <MdSearch style={styles.searchIcon} />
        </div>
      </div>

      <div style={styles.navSeparator} />

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
  logo: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
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
