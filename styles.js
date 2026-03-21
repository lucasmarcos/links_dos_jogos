import { css } from './tags.js';

export const getStyles = (brandBlue) => css`
  :root {
      --primary: ${brandBlue};
      --bg: #f1f5f9;
      --card-bg: #ffffff;
      --text: #0f172a;
  }
  body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  header {
      text-align: center;
      margin-bottom: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .logo {
      width: 140px;
      height: 140px;
      margin-bottom: 1rem;
      object-fit: contain;
  }
  .emoji-header {
      font-size: 4.5rem;
      margin-bottom: 0.5rem;
  }
  h1 {
      font-size: 2.5rem;
      color: var(--primary);
      margin: 0;
      font-weight: 800;
  }
  header p {
      margin-top: 0.5rem;
      font-size: 1.25rem;
      color: #64748b;
  }
  .container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 600px;
  }
  .game-card {
      background: var(--card-bg);
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border: 2px solid transparent;
  }
  .game-card:hover {
      transform: translateX(8px);
      border-color: var(--primary);
      box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  }
  .favicon {
      width: 32px;
      height: 32px;
      border-radius: 6px;
  }
  .info {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      max-width: 100%;
  }
  .game-card h2 {
      margin: 0;
      font-size: 1.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
  .game-card span {
      font-size: 0.8rem;
      color: #64748b;
  }
  footer {
      margin-top: 3rem;
      color: #94a3b8;
      font-size: 0.9rem;
  }
`;
