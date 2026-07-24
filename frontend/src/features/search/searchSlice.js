import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    results: [],
    loading: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setResults: (state, action) => {
            state.results = action.payload;
        },
        clearResults: (state) => {
            state.results = [];
        },
    },

})

export const { setLoading, setResults, clearResults } = searchSlice.actions;

export default searchSlice.reducer;