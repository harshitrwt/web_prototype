import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Some details...</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}
export default MainPage;