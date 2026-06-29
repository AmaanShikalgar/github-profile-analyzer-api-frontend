import React, { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onAnalyze, loading }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onAnalyze(trimmed);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter a GitHub username…"
          value={value}
          onChange={e => setValue(e.target.value)}
          autoComplete="off"
          spellCheck="false"
          disabled={loading}
        />
        {value && (
          <button type="button" className={styles.clear} onClick={() => setValue('')} aria-label="Clear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>
      <button className={styles.btn} type="submit" disabled={loading || !value.trim()}>
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 2 13 9 20 9"/><polyline points="11 22 11 15 4 15"/>
            <path d="M3 3l7.07 7.07M20.49 20.49L13.41 13.41"/>
          </svg>
        )}
        {loading ? 'Analyzing…' : 'Analyze'}
      </button>
    </form>
  );
}
