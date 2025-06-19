import { useState } from "react";
import { MdSearch} from 'react-icons/md';
function AddReviewPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (

    <div style={styles.wrapper}>
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
      <h2 style={styles.heading}>
        सूचना प्रौद्योगिकी समूह / Information Technology Group
      </h2>

      
      

      <div style={styles.form}>
        <p style={styles.subheading}>POST A NEW TOPIC</p>
        <span style={{ borderBottom: '1px solid grey', width: '100%' }}></span>
        <label style={styles.label}>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="10"
          style={styles.textarea}
        />

        <label style={styles.label}>Attach PDF File:</label>
        <input type="file" accept=".pdf" onChange={handleFileUpload} />
        {file && (
          <p style={styles.uploaded}>📎 Uploaded: {file.name}</p>
        )}

        <div style={styles.buttonGroup}>
          <button style={styles.button}>Load draft</button>
          <button style={styles.button}>Save draft</button>
          <button style={styles.button}>Preview</button>
          <button style={styles.button}>Submit</button>
        </div>

        

        
      </div>
      <div style={styles.tabs}>
          <button style={styles.tab}>Options</button>
          <button style={styles.tab}>Attachments</button>
          <button style={styles.tab}>Poll creation</button>
        </div>

        <div style={styles.options}>
          <label><input type="checkbox" /> Disable BBCode</label>
          <label><input type="checkbox" /> Disable smilies</label>
          <label><input type="checkbox" /> Do not automatically parse URLs</label>
          <label><input type="checkbox" /> Attach a signature</label>
          <label><input type="checkbox" /> Notify me when a reply is posted</label>
          <label><input type="checkbox" /> Lock topic</label>
        </div>

        <div style={styles.postType}>
          <span>Post topic as:</span>
          <label><input type="radio" name="type" /> Normal</label>
          <label><input type="radio" name="type" /> Sticky</label>
          <label><input type="radio" name="type" /> Announce</label>
          <label><input type="radio" name="type" /> Global</label>
        </div>

        <div style={styles.stickyControl}>
          <label>
            Stick topic for: <input type="number" style={styles.daysInput} /> days
          </label>
          <p>Enter 0 for a never-ending Sticky/Announcement.</p>
        </div>

        <div style={styles.backLink}>↩ Board Index</div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "1200px",
    margin: "auto",

    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
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
  searchIcon: {
    fontSize: '18px',
    cursor: 'pointer',
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  subheading: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  form: {
    border: "1px solid #444",
    padding: "25px",
    backgroundColor: "#f9f9f9",
    marginTop: "20px",
  },
  label: {
    fontWeight: "bold",
    marginTop: "15px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    marginTop: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  uploaded: {
    marginTop: "5px",
    color: "#007BFF",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#01447C",
    color: "#fff",
    padding: "8px 14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  tabs: {
    marginTop: "30px",
    display: "flex",
    gap: "10px",
    
  },
  tab: {
    backgroundColor: "#ccc",
    padding: "6px 12px",
    borderRadius: "4px",
    border: "1px solid #888",
    cursor: "pointer",
  },
  options: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  postType: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
  },
  stickyControl: {
    marginTop: "20px",
  },
  daysInput: {
    width: "60px",
    padding: "4px",
    marginLeft: "8px",
  },
  backLink: {
    marginTop: "30px",
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#01447C",
    cursor: "pointer",
  },
};

export default AddReviewPage;
