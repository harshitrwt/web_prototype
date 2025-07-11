import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const emojis = ["😀", "😂", "😍", "👍", "🙏", "🔥", "🎉", "💡", "✅", "❌"];

function AddReviewPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("Options");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [drafts, setDrafts] = useState([]);
  const [selectedDraftId, setSelectedDraftId] = useState(null);
  const [loadError, setLoadError] = useState("");



  const textareaRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const section = location.state?.section || "itg";

  const sectionTitles = {
    canteen: "सीएसडी कैंटीन / CSD Canteen",
    financepage: "वित्त / Finance",
    hrd: "मानव संसाधन विकास / Human Resource Development",
    sports: "खेल / Sports",
    CGHS: "केंद्रीय स्वास्थ्य सेवा / Central Government Health Scheme",
    itg: "सूचना प्रौद्योगिकी समूह / Information Technology Group"
  };
  const headingText = sectionTitles[section];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("drafts") || "[]");
    const filtered = saved.filter((draft) => draft.section === section);
    setDrafts(filtered);
  }, [section]);


  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const fileUrl = URL.createObjectURL(uploadedFile);

    setFile({
      name: uploadedFile.name,
      url: fileUrl
    });
    setMessage((prev) => `${prev}\n[${uploadedFile.name}](#uploaded-file)`);

  };



  const addEmoji = (emoji) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      message.substring(0, start) + emoji + message.substring(end);
    setMessage(newText);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      textarea.focus();
    }, 0);
  };

  const handleSubmit = () => {
  if (!subject.trim() || !message.trim()) {
    alert("Please enter both subject and message.");
    return;
  }

  const allTopics = JSON.parse(localStorage.getItem("allTopics") || "[]");

  // If no file, just save directly
  if (!file) {
    const newTopic = {
      id: Date.now(),
      subject,
      message,
      section,
      file: null,
      timestamp: new Date().toISOString()
    };

    const updated = [newTopic, ...allTopics];
    localStorage.setItem("allTopics", JSON.stringify(updated));
    navigate(location.state?.from || "/");
    return;
  }

  // If there's a file, convert to base64 before saving
  const reader = new FileReader();
  reader.onload = () => {
    const fileData = {
      name: file.name,
      type: file.type,
      content: reader.result
    };

    const newTopic = {
      id: Date.now(),
      subject,
      message: `${message}\n[${file.name}](#uploaded-file)`, // ensure this is added
      section,
      file: fileData,
      timestamp: new Date().toISOString()
    };

    const updated = [newTopic, ...allTopics];
    localStorage.setItem("allTopics", JSON.stringify(updated));
    navigate(location.state?.from || "/");
  };

  reader.readAsDataURL(file); // convert to base64
};

  
  const handleSaveDraft = () => {
  if (!subject.trim() && !message.trim()) return;

  let fileData = null;

  if (file) {
    fileData = {
      name: file.name,
      type: file.type,
      content: null
    };

    const reader = new FileReader();

    reader.onload = () => {
      fileData.content = reader.result;

      const newDraft = {
        id: Date.now(),
        subject,
        message,
        file: fileData,
        section // ✅ include section always!
      };

      const existingDrafts = JSON.parse(localStorage.getItem("drafts") || "[]");
      const updatedDrafts = [newDraft, ...existingDrafts];
      localStorage.setItem("drafts", JSON.stringify(updatedDrafts));
      setDrafts(updatedDrafts.filter(d => d.section === section));
      setSubject("");
      setMessage("");
      setFile(null);
    };

    reader.readAsDataURL(file); // encode as base64
  } else {
    const newDraft = {
      id: Date.now(),
      subject,
      message,
      file: null,
      section // ✅ make sure to include section here too!
    };

    const existingDrafts = JSON.parse(localStorage.getItem("drafts") || "[]");
    const updatedDrafts = [newDraft, ...existingDrafts];
    localStorage.setItem("drafts", JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts.filter(d => d.section === section));
    setSubject("");
    setMessage("");
    setFile(null);
  }
};



  const handleLoadDraft = () => {
    if (!selectedDraftId) {
      setLoadError("Please select a draft to load.");
      return;
    }

    const draft = drafts.find(d => d.id === selectedDraftId);
    if (draft) {
      setSubject(draft.subject);
      setMessage(draft.message);
      setLoadError("");

      if (draft.file) {
        const blob = fetch(draft.file.content)
          .then(res => res.blob())
          .then(blob => {
            const restoredFile = new File([blob], draft.file.name, { type: draft.file.type });
            setFile(restoredFile);
          });
      } else {
        setFile(null);
      }
    }
  };



  const handleDeleteDraft = (id) => {
    const updated = drafts.filter((d) => d.id !== id);
    localStorage.setItem("drafts", JSON.stringify(updated));
    setDrafts(updated);
    if (selectedDraftId === id) setSelectedDraftId(null);
  };




  return (
    <div style={styles.wrapper}>
      {/* Navbar */}
      <div
        style={{
          ...styles.navbar,
          height: isMobile ? "60px" : "80px",
          padding: isMobile ? "8px 12px" : "12px 20px",
          fontSize: isMobile ? "12px" : "16px",
        }}
      >
        <div style={styles.navLeft}>
          <div style={styles.logoTitleWrapper}>
            <img
              src="/imglogo.png"
              alt="Logo"
              style={{
                ...styles.logo,
                width: isMobile ? "50px" : "75px",
                height: isMobile ? "50px" : "75px",
              }}
            />
            <div style={styles.hindiTitle}>
              <div
                style={{
                  fontSize: isMobile ? "12px" : "21px",
                  width: isMobile ? "170px" : "auto",
                }}
              >
                ठोसावस्था भौतिकी प्रयोगशाला बुलेटिन बोर्ड /
              </div>
              <div style={{ fontSize: isMobile ? "10px" : "21px" }}>
                Solid State Physics Laboratory Bulletin Board
              </div>
            </div>
          </div>
        </div>
        <div style={styles.navRight}></div>
      </div>

      {/* Title */}
      <div style={styles.headerRow}>
        <Link to="/" style={{ ...styles.indexLink, textDecoration: 'none', color: 'inherit' }}>
          🏠︎ Board Index
        </Link>
      </div>

      <h2 style={styles.heading}>{headingText}</h2>

      {/* Form */}
      <div style={styles.form}>
        <p style={styles.subheading}>POST A NEW TOPIC</p>
        <span style={{ borderBottom: "1px solid grey", width: "100%" }}></span>

        <label style={styles.label}>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={styles.input}
        />

        <div style={styles.messageHeader}>
          <label style={styles.label}>Message:</label>
          <button
            type="button"
            onClick={() => setShowEmojiPicker((v) => !v)}
            style={styles.emojiTopButton}
            aria-label="Toggle emoji picker"
          >
            😊
          </button>
        </div>

        <div style={{ position: "relative" }}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="10"
            style={styles.textarea}
          />
          {showEmojiPicker && (
            <div style={styles.emojiPicker}>
              {emojis.map((emj) => (
                <span
                  key={emj}
                  style={styles.emoji}
                  onClick={() => {
                    addEmoji(emj);
                    setShowEmojiPicker(false);
                  }}
                >
                  {emj}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={handleLoadDraft}>Load draft</button>
          <button style={styles.button} onClick={handleSaveDraft}>Save draft</button>
          <button style={styles.button} onClick={() => setShowPreview(true)}>Preview</button>
          <button style={styles.button} onClick={handleSubmit}>Submit</button>
        </div>

        {loadError && <p style={{ color: "red", marginTop: "5px" }}>{loadError}</p>}


        {drafts.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h4>Saved Drafts:</h4>
            {drafts.map((draft) => (
              <div key={draft.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="radio"
                  checked={selectedDraftId === draft.id}
                  onChange={() => setSelectedDraftId(draft.id)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ color: '#01447C', cursor: 'pointer', flex: 1 }}>{draft.subject || "[No Subject]"}</span>
                <button
                  onClick={() => handleDeleteDraft(draft.id)}
                  style={{
                    marginLeft: '10px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'red',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}





        {showPreview && (
          <div style={styles.previewBox}>
            <h3>{subject || "[No Subject]"}</h3>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {(message || "[No Message]").split('\n').map((line, idx) => {
                // Check if line contains the uploaded file markdown syntax
                const isUploadedLink = line.includes('](#uploaded-file)');
                if (isUploadedLink && file) {
                  return (
                    <div key={idx}>
                      📎 <a
                        href={file.url || file.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                      >
                        {file.name}
                      </a>
                    </div>
                  );
                }
                return <div key={idx}>{line}</div>;
              })}
            </div>


            <button onClick={() => setShowPreview(false)}>Close Preview</button>
          </div>
        )}

        {/* Tabs */}
        <div style={styles.tabs}>
          {["Options", "Attachments", "Poll creation"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Attachments" && (
          <div style={styles.attachments}>
            <label style={styles.label}>Attach PDF File:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              style={{ marginBottom: "10px" }}
            />
            {file && (
              <p style={styles.uploaded}>
                📎 Uploaded: {file.name}{" "}
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  style={styles.removeFileButton}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </p>
            )}
          </div>
        )}

        {activeTab === "Options" && (
          <div style={styles.options}>
            <label><input type="checkbox" /> Disable BBCode</label>
            <label><input type="checkbox" /> Disable smilies</label>
            <label><input type="checkbox" /> Do not automatically parse URLs</label>
            <label><input type="checkbox" /> Attach a signature</label>
            <label><input type="checkbox" /> Notify me when a reply is posted</label>
            <label><input type="checkbox" /> Lock topic</label>
          </div>
        )}

        {activeTab === "Poll creation" && (
          <div style={{ marginTop: 20 }}>Poll creation options here (if any)</div>
        )}

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
      </div>

      <div style={styles.belowboardLink}>

        🏠︎ Board Index

      </div>


    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "1200px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    padding: "10px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#01447C",
    height: "80px",
    color: "#fff",
    padding: "12px 20px",
    fontFamily: "monospace",
    fontSize: "16px",
    fontWeight: "bold",
    border: "1px solid #000",
  },
  navLeft: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  logoTitleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  logo: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
  },
  hindiTitle: {
    fontSize: "21px",
    fontWeight: "bold",
    color: "#fff",
    lineHeight: "1.2",
    whiteSpace: "normal",
    overflowWrap: "break-word",
    marginTop: "10px",
  },
  headerRow: {
    display: "flex",
    height: "60px",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "10px 20px",
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    border: "1px solid #000",
    backgroundColor: "#F1F1F1",
    marginBottom: "10px",
  },
  indexLink: {
    fontSize: "20px",
    cursor: "pointer",
  },
  searchIcon: {
    fontSize: "18px",
    cursor: "pointer",
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
    borderRadius: "6px",
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
    resize: "vertical",
  },
  uploaded: {
    marginTop: "5px",
    color: "#007BFF",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  removeFileButton: {
    background: "transparent",
    border: "none",
    color: "#d00",
    cursor: "pointer",
    fontWeight: "bold",
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
    userSelect: "none",
  },
  activeTab: {
    backgroundColor: "#01447C",
    color: "#fff",
  },
  options: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  attachments: {
    marginTop: "20px",
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
  emojiButton: {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    userSelect: "none",
  },
  emojiPicker: {
    position: "absolute",
    bottom: "40px",
    right: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 100,
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    width: "200px",
  },
  emoji: {
    cursor: "pointer",
    fontSize: "20px",
    userSelect: "none",
  },
  messageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },
  emojiTopButton: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    userSelect: "none",
  },
  previewBox: {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "1px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "80%",
    color: "#333",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#01447C",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
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
  "@media (max-width: 768px)": {
    wrapper: {
      padding: "10px 15px",
    },
    navbar: {
      flexDirection: "column",
      height: "auto",
      padding: "10px",
      fontSize: "14px",
      textAlign: "center",
    },
    logo: {
      width: "60px",
      height: "60px",
    },
    hindiTitle: {
      fontSize: "18px",
    },
    form: {
      padding: "15px",
    },
    buttonGroup: {
      flexDirection: "column",
      gap: "10px",
    },
    postType: {
      flexDirection: "column",
      gap: "10px",
    },
    tabs: {
      flexDirection: "column",
      gap: "8px",
    },
  },
};

export default AddReviewPage;