import { createSlice } from "@reduxjs/toolkit";

let id = 1;
export const getNextId = () => id++;
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: true,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};

export const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: { // Corrected here
    toggleVisibility(state) {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    deleteQuote(state, action) {
      state.quotes = state.quotes.filter(qt => qt.id !== action.payload);
    },
    editQuoteAuthenticity(state, action) {
      const quoteToEdit = state.quotes.find(qt => qt.id === action.payload);
      quoteToEdit.apocryphal = !quoteToEdit.apocryphal;
    },
    setHighlightedQuote(state, action) {
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null;
      } else {
        state.highlightedQuote = action.payload;
      }
    },
    createQuote: {
      prepare({ authorName, quoteText }) {
        return {
          payload: {
            id: getNextId(),
            authorName,
            quoteText,
            apocryphal: false,
          },
        };
      },
      reducer(state, action) {
        state.quotes.push(action.payload);
      },
    }
  },
});

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote,
} = quoteSlice.actions;

export default quoteSlice.reducer;
