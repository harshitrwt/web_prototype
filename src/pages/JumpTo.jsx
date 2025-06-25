import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";

function JumpToForum() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const forums = [
    { title: 'प्रशासन / Admin', route: '/' },
    { title: 'सीजीएचएस / CGHS', route: '/dashboard' },
    { title: 'सीएसडी कैंटीन / CSD Canteen', route: '/canteenPage' },
    { title: 'वित्त / Finance', route: '/financePage' },
    { title: 'मानव संसाधन / HRD', route: '/hrdPage' },
    { title: 'सूचना प्रौद्योगिकी समूह / IT Group', route: '/itgPage' },
    { title: ' खेल / Sports', route: '/SportsPage' },
    { title: 'पुस्तकालय / Library', route: '/' },
    { title: 'सामग्री प्रबंधन समूह / Material Management Group', route: '/' },
    { title: 'मास्क सुविधा / Mask Facility', route: '/' },
    { title: 'जनता / Public', route: '/' },
  ];

  return (
    <div style={styles.boardindx}>
      <span
        style={styles.boardLink}
        onClick={() => navigate('/')}
        onMouseOver={(e) => (e.target.style.color = '#0d63ad')}
        onMouseOut={(e) => (e.target.style.color = '#01447C')}
      >
        &lt; Return to Board Index
      </span>

      <div style={{ position: "relative" }}>
        <button
          style={{
            ...styles.newTopicButton,
            ...(showDropdown ? styles.buttonHover : {}),
          }}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          Jump to <MdKeyboardArrowUp />
        </button>

        {showDropdown && (
          <div style={styles.dropup}>
            {forums.map((forum, index) => (
              <div
                key={index}
                style={{
                  ...styles.dropupItem,
                  backgroundColor:
                    hoveredItem === index ? "#e6f1ff" : "transparent",
                  color: hoveredItem === index ? "#0d63ad" : "#01447C",
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  navigate(forum.route);
                  setShowDropdown(false);
                }}
              >
                {forum.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  boardindx: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    padding: "1rem",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    position: "relative",
    zIndex: 1,
    flexWrap: "wrap",
  },
  boardLink: {
    fontWeight: "bold",
    cursor: "pointer",
    color: "#01447C",
    textDecoration: "underline",
    marginBottom: "0.5rem",
    transition: "color 0.3s",
  },
  newTopicButton: {
    background: 'linear-gradient(to right, #0d1a4a, #01447D)',
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    position: "relative",
    transition: "background-color 0.4s",
  },
  buttonHover: {
    backgroundColor: "#00365f",
  },
  dropup: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    backgroundColor: "#fff",
    border: "1px solid #01447C",
    borderRadius: "4px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    width: "260px",
    maxHeight: "300px",
    overflowY: "auto",
    zIndex: 2,
  },
  dropupItem: {
    padding: "10px 12px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    fontSize: "14px",
    color: "#01447C",
    transition: "all 0.2s",
  },
};

export default JumpToForum;
