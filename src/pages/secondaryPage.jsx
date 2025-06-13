import { useNavigate } from 'react-router-dom';

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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7fafc'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '2rem',
  };

  const optionsListStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    maxWidth: '600px',
  };

  const optionItemStyle = {
    backgroundColor: '#38a169',  // Tailwind's green-600
    color: '#ffffff',
    padding: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
  };

  const optionItemHoverStyle = {
    backgroundColor: '#2f855a',  // Tailwind's green-500
    transform: 'scale(1.05)',
  };

  const optionItemActiveStyle = {
    transform: 'scale(1)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Professional Options</h2>
      <ul style={optionsListStyle}>
        {options.map((option, index) => (
          <li
            key={index}
            style={optionItemStyle}
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

export default SecondaryPage;
