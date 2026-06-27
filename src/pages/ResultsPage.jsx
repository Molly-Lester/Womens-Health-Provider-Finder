import { useNavigate } from "react-router-dom";

export default function ResultsPage({ searchData }) {
    const navigate = useNavigate();

    if (!searchData) {
        return (
            <div className="results-empty">
                <h2>No search found</h2>
                <p>Please complete a search to view nearby services.</p>

                <button onClick={() => navigate("/")}>Back to search</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Search results for clinics</h2>


            {searchData.length === 0 && (
                <div>
                    <p>We couldn’t find any clinics matching your search.</p>
                    <p>Try adjusting your filters or searching for something else.</p>
                </div>
            )
            }

            {
                searchData.length > 0 && (
                    <ul>
                        {searchData.map((clinic) => (
                            <li key={clinic.clinic_id}>
                                <strong>{clinic.clinic_name}</strong> ({clinic.clinic_type})
                                <br />
                                {clinic.address}, {clinic.postcode}
                                <br />
                                {clinic.phone_number && <span>{clinic.phone_number}<br /></span>}
                                {clinic.website && (
                                    <a href={clinic.website} target="_blank" rel="noreferrer">
                                        Visit website
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                )
            }

            <button onClick={() => navigate("/")}>
                New Search
            </button>
        </div >
    );
}