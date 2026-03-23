import { css } from "./tags";

export const getStyles = (brandBlue: string): string => css`
  :root {
      --primary: ${brandBlue};
      --bg: #f1f5f9;
      --card-bg: #ffffff;
      --card-border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #475569;
      --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }

  @media (prefers-color-scheme: dark) {
      :root {
          --primary: #60a5fa;
          --bg: #020617;
          --card-bg: #1e293b;
          --card-border: #334155;
          --text: #f8fafc;
          --text-muted: #94a3b8;
          --shadow: 0 10px 15px -3px rgb(0 0 0 / 0.5);
      }
  }

  * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
  }

  body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 2rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      transition: background-color 0.3s ease;
  }

  header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInDown 0.8s ease-out;
  }

  .emoji-header {
      font-size: 4rem;
      margin-bottom: 0.5rem;
      display: inline-block;
      animation: float 3s ease-in-out infinite;
  }

  h1 {
      font-size: 2.5rem;
      color: var(--primary);
      margin: 0;
      font-weight: 800;
      letter-spacing: -0.025em;
  }

  header p {
      margin-top: 0.5rem;
      font-size: 1.1rem;
      color: var(--text-muted);
  }

  .container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      max-width: 500px;
      animation: fadeInUp 0.8s ease-out;
  }

  .game-card {
      background: var(--card-bg);
      padding: 0.875rem 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid var(--card-border);
      box-shadow: var(--shadow);
      text-decoration: none;
      color: inherit;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 1rem;
  }

  .game-card:hover {
      transform: translateY(-4px) scale(1.02);
      border-color: var(--primary);
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }

  .favicon {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: white;
      flex-shrink: 0;
  }

  .info {
      display: flex;
      flex-direction: column;
      min-width: 0;
  }

  .game-card h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  .game-card span {
      font-size: 0.8rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }

  footer {
      margin-top: 4rem;
      color: var(--text-muted);
      font-size: 0.8rem;
      text-align: center;
  }

  @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
  }
`;
