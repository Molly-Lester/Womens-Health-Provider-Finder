import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearResults } from "../features/search/searchSlice";
import classes from "./ResultsPage.module.css";


export default function ResultsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search.results);

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

      <button
        className={classes.button}
        onClick={() => {
          dispatch(clearResults());
          navigate("/");
        }}
      >
        New Search
      </button>

    </div>
  );
}
