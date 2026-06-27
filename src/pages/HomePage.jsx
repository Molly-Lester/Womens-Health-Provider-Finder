import { Container } from '@mantine/core';
import SearchForm from "../components/SearchForm";

export default function HomePage({ setSearchData, setLoading }) {
    return (
        <Container size="lg">
            <SearchForm onSearch={setSearchData} setLoading={setLoading} />
        </Container>
    );
}