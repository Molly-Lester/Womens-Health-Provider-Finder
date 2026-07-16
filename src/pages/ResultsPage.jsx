import { useNavigate } from "react-router-dom";
import classes from "./ResultsPage.module.css";

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
    <div className={classes.container}>
      <h2 className={classes.title}>Women's Health Providers Near You</h2>

      {searchData.length === 0 && (
        <div>
          <p>We couldn’t find any providers matching your search.</p>
          <p>Try adjusting your filters or searching for something else.</p>
        </div>
      )}

      {searchData.length > 0 && (
        <ul className={classes.resultsList}>
          {searchData.map((provider) => (
            <li key={provider.provider_id} className={classes.clinicCard}>
              <strong className={classes.clinicName}>
                {provider.provider_name}
              </strong>{" "}
              ({provider.provider_type})
              <br />

              {provider.address_line}, {provider.city}, {provider.postcode}

              <br />

              {provider.phone_number && (
                <span>
                  {provider.phone_number}
                  <br />
                </span>
              )}

              {provider.website && (
                <a href={provider.website} target="_blank" rel="noreferrer">
                  Visit website
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <button className={classes.button} onClick={() => navigate("/")}>
        New Search
      </button>
    </div>
  );
}
