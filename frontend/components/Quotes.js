import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility, deleteQuote, editQuoteAuthenticity, setHighlightedQuote, createQuote } from '../state/quotesSlice'
export default function Quotes() {
  const quotes = useSelector(st => st.quotesState.quotes)
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
  const dispatch = useDispatch()
  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => {
                     const actionToDispatch = deleteQuote(qt.id)
                     dispatch(actionToDispatch)
                  }}>DELETE</button>
                  <button onClick={() => {
                    dispatch(setHighlightedQuote(qt.id))
                  }}>HIGHLIGHT</button>
                  <button onClick={() => {
                    dispatch(editQuoteAuthenticity(qt.id))
                  }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button 
        onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
