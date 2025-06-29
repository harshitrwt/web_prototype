import { useNavigate } from 'react-router-dom';
import { MdSearch, MdOutlineMenu } from 'react-icons/md';
import { useEffect, useState } from 'react';

function MainPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState(""); 
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const forums = [
    { title: 'प्रशासन / Admin', topics: 259, route: '/' },
    { title: 'सीजीएचएस / CGHS', topics: 12, route: '/dashboard' },
    { title: 'सीएसडी कैंटीन / CSD Canteen', topics: 15, route: '/canteenPage' },
    { title: 'वित्त / Finance', topics: 10, route: '/financePage' },
    { title: 'मानव संसाधन / HRD', topics: 16, route: '/hrdPage' },
    { title: 'सूचना प्रौद्योगिकी समूह / IT Group', topics: 65, route: '/itgPage' },
    { title: 'उपकरण / Instrumentation', topics: 2, route: '/instrumentation' },
    { title: 'पुस्तकालय / Library', topics: 27, route: '/library' },
    { title: 'सामग्री प्रबंधन समूह / Material Management Group', topics: 52, route: '/mmg' },
    { title: 'मास्क सुविधा / Mask Facility', topics: 5, route: '/mask' },
    { title: 'जनता / Public', topics: 38, route: '/public' },
    { title: 'क्यूएमएस समूह / QMS Group', topics: 4, route: '/qms' },
    { title: 'गोपनीय अनुभाग / Confidential', topics: 21, route: '/confidential' },
    { title: 'खेल / Sports', topics: 2, route: '/sportsPage' },
    { title: 'कार्यशाला / Workshop', topics: 2, route: '/workshop' }
  ];


  const filteredForums = forums.filter(forum => {
    const englishTitle = forum.title.split('/')[1]?.trim().toLowerCase() || '';
    return englishTitle.includes(search.toLowerCase());
  });

  return (
    <div className="p-4" style={styles.page}>

      <div
        style={{
          ...styles.navbar,
          height: isMobile ? '60px' : '80px',
          padding: isMobile ? '8px 12px' : '12px 20px',
          fontSize: isMobile ? '12px' : '16px'
        }}
      >
        <div style={styles.navLeft}>
          <div style={styles.logoTitleWrapper}>
            <img
              src="/imglogo.png"
              alt="Logo"
              style={{
                ...styles.logo,
                width: isMobile ? '50px' : '75px',
                height: isMobile ? '50px' : '75px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            />
            <div style={styles.hindiTitle}>
              <div style={{ fontSize: isMobile ? '12px' : '21px', width: isMobile ? '170px' : 'auto' }}>
                ठोसावस्था भौतिकी प्रयोगशाला बुलेटिन बोर्ड /
              </div>
              <div style={{ fontSize: isMobile ? '10px' : '21px' }}>
                Solid State Physics Laboratory Bulletin Board
              </div>
            </div>
          </div>
        </div>

        <div style={styles.navRight}>
          <button
            style={{
              ...styles.btnlogin,
              fontSize: isMobile ? '12px' : '14px',
              padding: isMobile ? '4px 10px' : '8px 16px'
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          {!isMobile && (
            <>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: isMobile ? '12px' : '14px',
                  marginLeft: '8px',
                  height: '25px',
                  width: '200px',
                }}
              />
              <MdSearch
                style={{
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              />
            </>
          )}
        </div>
      </div>

      <div
        style={{
          ...styles.headerRow,
          padding: isMobile ? '8px 12px' : '10px 20px',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '6px' : '0px',
        }}
      >
        <span
          style={{
            ...styles.indexLink,
            fontSize: isMobile ? '14px' : '20px',
            margin: isMobile ? '10px 0 0 0' : '85px 0 0 0',
          }}
        >
          Board Index
        </span>
        <span
          style={{
            ...styles.time,
            fontSize: isMobile ? '12px' : '14px',
            marginTop: isMobile ? '0' : '90px',
          }}
        >
          It is currently {new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }).replace(',', '')}
        </span>

      </div>

      <div style={styles.forumHeader}>Forum</div>

      <div style={styles.gridContainer}>
        {filteredForums.map((forum, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.iconWrapper}>
              <div style={styles.iconCircle}>
                <MdOutlineMenu style={styles.iconStyled} />
              </div>
            </div>

            <div style={styles.titleBlock}>
              <div
                style={styles.title}
                onClick={() => navigate(forum.route)}
                onMouseOver={(e) => (e.target.style.color = '#a6d1ff')}
                onMouseOut={(e) => (e.target.style.color = '#fff')}
              >
                {forum.title}
              </div>

              <div style={styles.topics}>Topics: {forum.topics}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.belowboardLink}>Board Index</div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#01447C',
    color: '#fff',
    fontFamily: 'monospace',
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
    borderRadius: '50%',
  },
  hindiTitle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: "10px",
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: '1.1',
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
    border: '1px solid #fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    border: '1px solid #000',
    backgroundColor: '#F1F1F1',
    minHeight: '60px',
  },
  indexLink: {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#01447C',
  },
  time: {
    fontSize: '14px',
  },
  forumHeader: {
    border: '2px solid #000',
    padding: '8px 20px',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '20px 0',
    color: '#fff',
    textAlign: 'center',
    background: 'linear-gradient(to right, #0d1a4a, #3c76b9)',
  },
  gridContainer: {
    border: '1px solid #000',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f1f1f1',
  },
  card: {
    backgroundColor: '#01447C',
    color: '#fff',
    border: '2px solid #000',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '120px',
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  iconCircle: {
    width: '30px',
    height: '30px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyled: {
    fontSize: '18px',
    color: '#01447C',
  },
  titleBlock: {
    marginTop: '10px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
    textDecoration: 'underline',
    color: '#fff',
    transition: 'color 0.3s',
  },
  topics: {
    fontSize: '13px',
    marginTop: '4px',
  },
  belowboardLink: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '10px 20px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: '16px',
    border: '1px solid black',
    marginTop: '20px',
  },
};

export default MainPage;
