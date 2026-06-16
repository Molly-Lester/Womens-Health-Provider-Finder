import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryCards from "./CategoryCards";
import classes from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState("10");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("")

    const handleSearch = () => {
        setError("");

        if (!location) {
            setError("Please enter a location to continue.");
            return;
        }

        if (!category) {
            setError("Please select a category to continue.");
            return;
        }

        onSearch({
            location,
            radius,
            category,
        });

        navigate("/results");
    };

    return (
        <div className="search-page">
            <header className="header">
                <h1>Women's Health Clinic Finder</h1>

                <p className="header-subtitle">
                    Helping you find the right women’s health support by filtering local services based on what you need.
                </p>
            </header>

            <main className={classes.form}>
                {/* Location */}

                <div className={classes.searchBar}>
                    <input
                        type="text"
                        placeholder="Enter your location"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            setError("");
                        }}
                        className={classes.input}
                    />

                    <select
                        id="radius"
                        value={radius}
                        onChange={(e) => {
                            setRadius(e.target.value);
                            setError("");
                        }}
                        className={classes.select}
                    >
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                        <option value="50">50 miles</option>
                        <option value="all">Anywhere in the UK</option>
                    </select>
                </div>

                {/* Category Cards */}

                <CategoryCards
                    category={category}
                    setCategory={setCategory}
                />

                {/* Search Button */}
                <button
                    className={classes.button}
                    onClick={handleSearch}
                >
                    Find My Best Matches
                </button>

                {/* Error message */}

                {error && (
                    <p className="error">
                        {error}
                    </p>)}
            </main>
        </div>
    );
}