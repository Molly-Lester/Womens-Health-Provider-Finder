import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Paper, Select, Text, SimpleGrid } from "@mantine/core";
import CategoryCards from "./CategoryCards";
import searchFormClasses from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
    const navigate = useNavigate();
    const [postcode, setPostcode] = useState("");
    const [radius, setRadius] = useState("5");
    const [category, setCategory] = useState(null);
    const [providerType, setProviderType] = useState("all");
    const [error, setError] = useState("")

    const handleSearch = async () => {
        console.log("Search button clicked")
        setError("");

        if (!postcode) {
            setError("Please enter a postcode to continue.");
            return;
        }

        if (!category) {
            setError("Please select a category to continue.");
            return;
        }

        try {
            const params = new URLSearchParams({
                postcode,
                radius,
                concern_id: category,
                clinic_type: providerType,
            });

            const response = await fetch(
                `http://localhost:3000/clinics/nearby?${params.toString()}`
            );
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            onSearch(data);

            navigate("/results");

        } catch (err) {
            setError("Failed to fetch clinics");
        }
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
                {/* Postcode */}
                <Paper
                    withBorder
                    radius="md"
                    p="lg"
                >
                    <Text mb="sm" size="sm" ta="left">
                        Where should we search?
                    </Text>
                    <div className={searchFormClasses.searchContainer}>
                        <div className={searchFormClasses.searchBar}>
                            <input
                                type="text"
                                placeholder="Enter your postcode"
                                value={postcode}
                                onChange={(e) => {
                                    setPostcode(e.target.value);
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

                {/* Provider */}
                <Paper className={searchFormClasses.sectionCard}>
                    <Text mb="sm" size="sm" ta="left">
                        Provider type
                    </Text>

                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        {[
                            { value: "all", label: "All services" },
                            { value: "nhs", label: "NHS" },
                            { value: "private", label: "Private" },
                        ].map((option) => (
                            <Paper
                                key={option.value}
                                withBorder
                                p="md"
                                radius="md"
                                onClick={() => {
                                    setProviderType(option.value);
                                    setError("");
                                }}
                                className={`${searchFormClasses.card} ${providerType === option.value ? searchFormClasses.selected : ""
                                    }`}
                            >
                                <Text fw={500} size="sm">
                                    {option.label}
                                </Text>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Paper>
                {/* Search Button */}
                <button
                    className={searchFormClasses.button}
                    onClick={handleSearch}
                >
                    Find My Best Matches
                </button>

                {/* Error message */}

                {error && (
                    <p style={{ color: "red", fontSize: "20px" }}>
                        {error}
                    </p>)}
            </main>
        </div>
    );
}