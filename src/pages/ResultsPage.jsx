import { useNavigate } from "react-router-dom";

export default function ResultsPage({ searchData }) {
    const navigate = useNavigate();


    if (!searchData) {
        return <p>Loading results...</p>;
    }

    if (searchData.length === 0) {
        return (
            <div className="results-empty">
                <h2>No clinics found</h2>
                <button onClick={() => navigate("/")}>
                    Back to search
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2>Search Results</h2>

            {searchData.map((clinic) => (
                <div key={clinic.clinic_id}>
                    <h3>{clinic.name}</h3>
                    <p>{clinic.address}</p>
                    <p>{clinic.clinic_type}</p>
                </div>
            ))}

            <button onClick={() => navigate("/")}>
                New Search
            </button>
        </div>
    );
}