import { useNavigate } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';

function SecondaryPage() {
  const navigate = useNavigate();

  const options = [
    "Meeting Notes",
    "Project Management",
    "Report Generation",
    "Client Communication",
    "Team Collaboration",
    "Code Review",
    "Bug Tracking",
    "Resource Allocation",
    "Scheduling Tasks",
    "Performance Metrics"
  ];

  return (
    <div style={styles.page}>
      {/* Top Navbar */}
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

      {/* Page Title */}
      <h2 style={styles.pageTitle}>Professional Options</h2>

      {/* Options List */}
      <ul style={styles.optionsList}>
        {options.map((option, index) => (
          <li
            key={index}
            style={styles.optionItem}
            onClick={() => navigate('/review')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2f855a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#38a169'}
            onMouseDown={(e) => e.target.style.transform = 'scale(1)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05)'}
          >
            {option}
          </li>
        ))}
      </ul>
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
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d3748',
    margin: '30px 20px',
    textAlign: 'center',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '10px',
  },
  optionsList: {
    listStyleType: 'none',
    padding: '0 20px',
    margin: '0 auto',
    maxWidth: '800px',
  },
  optionItem: {
    backgroundColor: '#38a169',
    color: '#ffffff',
    padding: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default SecondaryPage;
