import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Paper, Select, Text, SimpleGrid } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import CategoryCards from "./CategoryCards";
import searchFormClasses from './SearchForm.module.css';

export default function SearchForm({ onSearch, setLoading }) {
    const navigate = useNavigate();
    const [postcode, setPostcode] = useState("");
    const [radius, setRadius] = useState("5");
    const [category, setCategory] = useState(null);
    const [providerType, setProviderType] = useState("all");
    const [errors, setErrors] = useState({
        postcode: "",
        category: ""
    });

    const handleSearch = async () => {
        const newErrors = {
            postcode: "",
            category: ""
        };

        let hasError = false;

        if (!postcode) {
            newErrors.postcode = "Please enter a postcode to continue.";
            hasError = true;
        }

        if (!category) {
            newErrors.category = "Please select a category.";
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        setLoading(true);

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(1000);

        try {
            const params = new URLSearchParams({
                postcode,
                radius,
                service_id: category,
                provider_type: providerType,
            });

            const response = await fetch(
                `http://localhost:3000/providers/nearby?${params.toString()}`
            );

            const data = await response.json();

            if (!response.ok) {
                setErrors(prev => ({
                    ...prev,
                    form: data.error || "Something went wrong"
                }));

                showNotification({
                    title: "Network error",
                    message: data.error || "Something went wrong",
                    color: "red",
                });

                return;
            }

            onSearch(data);
            navigate("/results");

        } catch (err) {
            setErrors(prev => ({
                ...prev,
                form: "Failed to fetch providers"
            }));
            showNotification({
                title: "Network error",
                message: "We’re having trouble connecting to the server. Please check your connection and try again.",
                color: "red",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-page">
            <header className="header">
                <h1>Women's Health Provider Finder</h1>

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
                        <div
                            className={`${searchFormClasses.searchBar} 
                            ${errors.postcode ? searchFormClasses.searchBarError : ""}`}
                        >
                            <input
                                placeholder="Enter your postcode"
                                value={postcode}
                                onChange={(e) => {
                                    setPostcode(e.target.value);
                                    setErrors(prev => ({ ...prev, postcode: "" }));
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
                                    setErrors(prev => ({ ...prev, radius: "" }));
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
                    {errors.postcode && (
                        <p className={searchFormClasses.errorText}>
                            {errors.postcode}
                        </p>
                    )}
                </Paper>

                {/* Category Cards */}

                <CategoryCards
                    category={category}
                    setCategory={setCategory}
                    error={errors.category}
                />

                {/* Provider */}
                <Paper className={searchFormClasses.sectionCard}>
                    <Text mb="sm" size="sm" ta="left">
                        Provider type
                    </Text>

                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        {[
                            { value: "all", label: "All providers" },
                            { value: "NHS Service", label: "NHS" },
                            { value: "Private Clinic", label: "Private" },
                        ].map((option) => (
                            <Paper
                                key={option.value}
                                withBorder
                                p="md"
                                radius="md"
                                onClick={() => {
                                    setProviderType(option.value);
                                    setErrors(prev => ({ ...prev, provider: "" }));
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
            </main>
        </div>
    );
}