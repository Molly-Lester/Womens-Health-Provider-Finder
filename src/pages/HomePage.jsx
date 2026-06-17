import { Container } from '@mantine/core';
import SearchForm from "../components/SearchForm";

export default function HomePage({ setSearchData }) {
    return (
        <Container size="lg">
            <SearchForm onSearch={setSearchData} />
        </Container>
    );
}