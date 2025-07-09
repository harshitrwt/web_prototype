import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./CardDetails.css"

function CardDetails() {
  const { state } = useLocation();       // state.card came from Dashboard
  const { id } = useParams();            // /cards/:id
  const navigate = useNavigate();

  // 🚨 If the user refreshed the page there will be no state;
  // in real apps fetch the card from your store or API.
  if (!state?.card) {
    return (
      <div className="p-6">
        <p className="mb-4">Card not found (maybe you refreshed?).</p>
        <button onClick={() => navigate("/")} className="underline">
          Back to dashboard
        </button>
      </div>
    );
  }

  const { title: rawTitle, description: rawDesc, subject, message } = state.card;
  const title = rawTitle ?? subject;
  const description = rawDesc ?? message;

  return (
    <main className="abc">
      <button onClick={() => navigate(-1)} className="underline">
        ← Back
      </button>
      <p><strong>Subject:</strong>{title}</p>
      

      <p><strong>Message: </strong>{description}</p>
      
    </main>
  );
}


export default CardDetails;