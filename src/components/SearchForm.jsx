import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Paper, Select, Text } from "@mantine/core";
import CategoryCards from "./CategoryCards";
import searchFormClasses from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState("");
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

            <main className={searchFormClasses.form}>
                {/* Location */}
                <Paper
                    withBorder
                    radius="md"
                    p="lg"
                >
                    <Text mb="sm" size="sm" ta="left">
                        Location & Search Radius
                    </Text>
                    <div className={searchFormClasses.searchContainer}>
                        <div className={searchFormClasses.searchBar}>
                            <input
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setError("");
                                }}
                                className={searchFormClasses.input}
                            />
                        </div>

                        <div className={searchFormClasses.radiusSelect}>
                            <Select
                                id="radius"
                                value={radius}
                                onChange={(value) => {
                                    setRadius(value);
                                    setError('');
                                }}
                                placeholder="Select distance"
                                data={[
                                    { value: '5', label: '5 miles' },
                                    { value: '10', label: '10 miles' },
                                    { value: '25', label: '25 miles' },
                                    { value: '50', label: '50 miles' },
                                    { value: 'all', label: 'Anywhere in the UK' },
                                ]}
                                classNames={{
                                    input: searchFormClasses.select,
                                    option: searchFormClasses.option
                                }}
                                withCheckIcon={false}
                            />
                        </div>
                    </div>
                </Paper>

                {/* Category Cards */}

                <CategoryCards
                    category={category}
                    setCategory={setCategory}
                />

                {/* Search Button */}
                <button
                    className={searchFormClasses.button}
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