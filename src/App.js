import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import StoredProfiles from './components/StoredProfiles';
import { analyzeProfile, getAllProfiles } from './services/api';
import './App.css';

export default function App() {
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [stored, setStored] = useState([]);
  const [storedLoading, setStoredLoading] = useState(true);

  const loadStored = useCallback(async () => {
    setStoredLoading(true);
    try {
      const res = await getAllProfiles();
      const data = res.data;
      setStored(Array.isArray(data) ? data : (data.profiles || data.data || []));
    } catch {
      setStored([]);
    } finally {
      setStoredLoading(false);
    }
  }, []);

  useEffect(() => { loadStored(); }, [loadStored]);

  const handleAnalyze = async (username) => {
    setAnalyzing(true);
    setError('');
    setResult(null);
    try {
      const res = await analyzeProfile(username);
      setResult(res.data.profile);
      loadStored();
    } catch (e) {
      const msg = e?.response?.data?.error || e?.response?.data?.message || e.message || 'Something went wrong.';
      setError(msg);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSelect = (username) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleAnalyze(username);
  };

  return (
    <div className="layout">
      <header className="appHeader">
        <div className="headerInner">
          <div className="brand">
            <svg className="brandIcon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <div>
              <div className="brandName">GitHub Profile Analyzer</div>
              <div className="brandSub">Analyze public profiles · store insights</div>
            </div>
          </div>
          <a className="apiPill" href="https://github-profile-analyzer-api-9622.up.railway.app" target="_blank" rel="noreferrer">
            <span className="apiDot" />
            API live
          </a>
        </div>
      </header>

      <main className="main">
        <section className="searchSection">
          <SearchBar onAnalyze={handleAnalyze} loading={analyzing} />
          {error && (
            <div className="errorBar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}
          {result && <ProfileCard profile={result} isNew />}
        </section>

        <section className="storedSection">
          <div className="sectionLabel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
            Stored profiles
          </div>
          <StoredProfiles profiles={stored} loading={storedLoading} onSelect={handleSelect} />
        </section>
      </main>
    </div>
  );
}
