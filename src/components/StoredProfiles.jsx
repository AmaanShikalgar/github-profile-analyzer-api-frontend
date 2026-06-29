import React, { useState } from 'react';
import styles from './StoredProfiles.module.css';

const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572a5',
  Go: '#00add8', Rust: '#dea584', Java: '#b07219', C: '#555555',
  'C++': '#f34b7d', 'C#': '#178600', Ruby: '#701516', PHP: '#4f5d95',
  Swift: '#f05138', Kotlin: '#a97bff', Dart: '#00b4ab', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Vue: '#41b883', Svelte: '#ff3e00',
  default: '#8b949e',
};

const fmtN = (n) => {
  if (n == null) return '—';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
};

const fmtD = (s) => {
  if (!s) return '';
  try {
    return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return ''; }
};

export default function StoredProfiles({ profiles, loading, onSelect }) {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  const displayed = [...profiles]
    .filter(p => {
      const q = search.toLowerCase();
      return !q || p.username.toLowerCase().includes(q) || (p.name || '').toLowerCase().includes(q);
    })
    .sort((a, b) => tab === 'recent'
      ? new Date(b.updated_at) - new Date(a.updated_at)
      : (a.username || '').localeCompare(b.username || ''));

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'all' ? styles.active : ''}`}
            onClick={() => setTab('all')}
          >
            All
            <span className={styles.count}>{profiles.length}</span>
          </button>
          <button
            className={`${styles.tab} ${tab === 'recent' ? styles.active : ''}`}
            onClick={() => setTab('recent')}
          >
            Recently updated
          </button>
        </div>
        {profiles.length > 0 && (
          <input
            className={styles.filter}
            type="text"
            placeholder="Filter…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        )}
      </div>

      {loading ? (
        <div className={styles.msg}>
          <span className={styles.spinner} />
          Loading profiles…
        </div>
      ) : displayed.length === 0 ? (
        <div className={styles.msg}>
          {search ? 'No profiles match that filter.' : 'No profiles stored yet — analyze one above!'}
        </div>
      ) : (
        <div className={styles.list}>
          {displayed.map(p => {
            const color = LANG_COLORS[p.top_language] || LANG_COLORS.default;
            return (
              <button
                key={p.username}
                className={styles.row}
                onClick={() => onSelect(p.username)}
                title={`Re-analyze @${p.username}`}
              >
                <img
                  className={styles.avatar}
                  src={p.avatar_url || ''}
                  alt={p.username}
                  onError={e => { e.target.style.background = '#21262d'; e.target.src = ''; }}
                />
                <div className={styles.info}>
                  <div className={styles.name}>{p.name || p.username}</div>
                  <div className={styles.handle}>@{p.username}</div>
                  {p.top_language && (
                    <div className={styles.lang}>
                      <span className={styles.dot} style={{ background: color }} />
                      {p.top_language}
                    </div>
                  )}
                </div>
                <div className={styles.right}>
                  <div className={styles.repos}>{fmtN(p.public_repos)} repos</div>
                  <div className={styles.followers}>{fmtN(p.followers)} followers</div>
                  <div className={styles.date}>{fmtD(p.updated_at)}</div>
                </div>
                <div className={styles.chevron}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
