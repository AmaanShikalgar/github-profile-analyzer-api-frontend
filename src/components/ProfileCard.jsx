import React from 'react';
import styles from './ProfileCard.module.css';

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

export default function ProfileCard({ profile, isNew }) {
  const { username, name, bio, avatar_url, location, public_repos, followers, following, top_language, updated_at } = profile;
  const langColor = LANG_COLORS[top_language] || LANG_COLORS.default;

  return (
    <div className={`${styles.card} ${isNew ? styles.new : ''}`}>
      {isNew && (
        <div className={styles.topBar}>
          <span className={styles.badge}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Analyzed &amp; stored
          </span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className={styles.ghLink}
          >
            github.com/{username}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:3}}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      )}

      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={avatar_url || ''}
          alt={username}
          onError={e => { e.target.style.background = '#21262d'; e.target.src = ''; }}
        />
        <div className={styles.meta}>
          <div className={styles.name}>{name || username}</div>
          <div className={styles.handle}>@{username}</div>
          {bio && bio !== 'N/A' && <div className={styles.bio}>{bio}</div>}
          {location && location !== 'N/A' && (
            <div className={styles.location}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {location}
            </div>
          )}
        </div>
      </div>

      <div className={styles.stats}>
        {[
          { label: 'Repos', value: fmtN(public_repos) },
          { label: 'Followers', value: fmtN(followers) },
          { label: 'Following', value: fmtN(following) },
          { label: 'Top language', value: top_language || '—', small: true },
        ].map(({ label, value, small }) => (
          <div key={label} className={styles.statBox}>
            <div className={`${styles.statVal} ${small ? styles.statValSm : ''}`}>{value}</div>
            <div className={styles.statLabel}>{label}</div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        {top_language ? (
          <span className={styles.langChip}>
            <span className={styles.langDot} style={{ background: langColor }} />
            {top_language}
          </span>
        ) : <span />}
        {updated_at && (
          <span className={styles.timestamp}>
            Updated {new Date(updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>
    </div>
  );
}
