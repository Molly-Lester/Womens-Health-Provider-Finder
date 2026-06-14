import SearchForm from "../components/SearchForm";

export default function HomePage({ setSearchData }) {

    return (
        <div>
            <SearchForm onSearch={setSearchData} />
        </div>
    );
}