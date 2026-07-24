import { Container } from '@mantine/core';
import SearchForm from "../components/SearchForm";

export default function HomePage() {
    return (
        <Container size="lg">
            <SearchForm />
        </Container>
    );
}