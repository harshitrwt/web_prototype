import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



function AddReviewPage() {
  const [editorContent, setEditorContent] = useState("");
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleEmojiSelect = (emoji) => {
    setEditorContent((prev) => prev + emoji.native);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Review Page</h2>

      

      {/* File Upload */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input type="file" accept=".pdf" onChange={handleFileUpload} />
        {file && <p>📄 File Uploaded: {file.name}</p>}
      </div>

      {/* Output */}
      <div>
        <h3>📝 Review Preview</h3>
        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginBottom: "1rem",
            background: "#f9f9f9",
          }}
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
        {file && (
          <a
            href={URL.createObjectURL(file)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            View Uploaded File
          </a>
        )}
      </div>
    </div>
  );
}

export default AddReviewPage;
