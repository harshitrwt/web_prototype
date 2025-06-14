import { useNavigate } from 'react-router-dom';
import { MdSearch, MdOutlineMenu } from 'react-icons/md';

function MainPage() {
  const navigate = useNavigate();

  const forums = [
    { title: 'प्रशासन / Admin', topics: 259 },
    { title: 'सीजीएचएस / CGHS', topics: 12 },
    { title: 'सीएसडी कैंटीन / CSD Canteen', topics: 15 },
    { title: 'वित्त / Finance', topics: 10 },
    { title: 'मानव संसाधन / HRD', topics: 16 },
    { title: 'सूचना प्रौद्योगिकी समूह / IT Group', topics: 65 },
    { title: 'उपकरण / Instrumentation', topics: 2 },
    { title: 'पुस्तकालय / Library', topics: 27 },
    { title: 'सामग्री प्रबंधन समूह / Material Management Group', topics: 52 },
    { title: 'मास्क सुविधा / Mask Facility', topics: 5 },
    { title: 'जनता / Public', topics: 38 },
    { title: 'क्यूएमएस समूह / QMS Group', topics: 4 },
    { title: 'गोपनीय अनुभाग / Confidential', topics: 21 },
    { title: 'खेल / Sports', topics: 2 },
    { title: 'तकनीकी सचिवालय / Technical Secretariat', topics: 1 },
    { title: 'जलपान गृह / Wet Canteen', topics: 3 },
    { title: 'वर्क्स खंड / Works Section', topics: 1 },
    { title: 'कार्यशाला / Workshop', topics: 2 }
  ];

  return (
    <div style={styles.page}>
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.hindiTitle}>विवेकानन्द अध्ययन संस्थान/ Material Management Group Bulletin Board</div>
        </div>

        <div style={styles.navRight}>
          <button style={styles.btnlogin} onClick={() => navigate('/login')}>Login</button>
          <MdSearch style={styles.searchIcon} />
        </div>
      </div>

      <div style={styles.navSeparator} />

      {/* Header */}
      <div style={styles.headerRow}>
        <span style={styles.indexLink}>↩ Board Index</span>
        <span style={styles.time}>It is currently 11 Jun 2025, 11:55</span>
      </div>

      {/* Forum */}
      <div style={styles.forumHeader}>Forum</div>

      {/* Forum Sections */}
      <div style={styles.gridContainer}>
        {forums.map((forum, index) => (
          <div key={index} style={styles.card}>
            <MdOutlineMenu style={styles.icon} />
            <div style={styles.titleBlock}>
              <div style={styles.title}>{forum.title}</div>
              <div style={styles.topics}>Topics: {forum.topics}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.indexLink}>↩ Board Index</div>
    </div>
  );
}

// Styles
const styles = {
  page: {
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    padding: '0',
    maxWidth: '1200px',
    margin: '0 auto',
    
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
  },
  hindiTitle: {
    fontSize: '20px',
    
  },
  navRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '12px',
  },
  login: {
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
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    border: '1px solid #000',
    backgroundColor: '#F1F1F1',
  },
  indexLink: {
    fontSize: '20px',
    margin: '30px 20px 20px',
    cursor: 'pointer',
    marginBottom: '7vh',
    backgroundColor: '#F1F1F1',
    
  },
  time: {
    fontSize: '14px',
    marginTop: '90px',
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
    background: 'linear-gradient(to right, #0d1a4a, #3c76b9)'
    
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '2px solid #000',
    padding: '20px',
    borderRadius: '8px',
    height: '120px',
    justifyContent: 'center',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#01447C',
  },
  icon: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  titleBlock: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '15px',
  },
  topics: {
    fontSize: '13px',
    marginTop: '2px',
  },
};

export default MainPage;
