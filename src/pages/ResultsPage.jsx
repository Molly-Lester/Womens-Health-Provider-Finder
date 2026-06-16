import { useNavigate } from "react-router-dom";

export default function ResultsPage({ searchData }) {
    const navigate = useNavigate();


    if(!searchData) {
        return(
            <div className= "results-empty">
                <h2>No search found</h2>
                <p>Please complete a search to view nearby services.</p>
                
                <button onClick={() => navigate("/")}>
                    Back to search
                </button>
            </div>
        );
    }
   
    return(
        <div>
            <h2>Search Results</h2>

            <p>Location: {searchData.location}</p>
            <p>Distance: {searchData.radius}</p>
            <p>Category: {searchData.category}</p>
            <p>Provider: {searchData.providerType}</p>

            <h3>Clinics</h3>

            <button onClick={() => navigate("/")}>
                New Search
            </button>
        </div>
    )
}