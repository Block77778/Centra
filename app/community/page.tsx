<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Community Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: #f9f9f9;
    }

    /* Quicklinks Navigation */
    .quicklinks {
      display: flex;
      gap: 20px;
      background: #fff;
      padding: 15px 30px;
      border-bottom: 1px solid #ddd;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .quicklinks a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      position: relative;
      transition: all 0.3s ease;
    }

    /* Hover underline animation */
    .quicklinks a::after {
      content: "";
      position: absolute;
      width: 0%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background: #ff6600; /* brand color */
      transition: width 0.3s ease;
    }

    .quicklinks a:hover {
      color: #ff6600;
      transform: translateY(-2px);
    }

    .quicklinks a:hover::after {
      width: 100%;
    }

    /* Section styling */
    section {
      padding: 80px 20px;
      min-height: 100vh;
    }

    #discussion { background: #fff; }
    #polls { background: #f0f4ff; }
    #announcements { background: #fff7e6; }

    /* Community actions (like, share, etc.) */
    .community-actions {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }

    .community-actions button {
      background: #eee;
      border: none;
      padding: 10px 18px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .community-actions button:hover {
      background: #ff6600;
      color: #fff;
      transform: scale(1.08);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>

  <!-- Quicklinks -->
  <nav class="quicklinks">
    <a href="#discussion">Discussion</a>
    <a href="#polls">Polls</a>
    <a href="#announcements">Announcements</a>
  </nav>

  <!-- Sections -->
  <section id="discussion">
    <h2>Discussion</h2>
    <p>This is the discussion section where community members interact.</p>

    <div class="community-actions">
      <button>👍 Like</button>
      <button>🔄 Share</button>
      <button>💬 Comment</button>
    </div>
  </section>

  <section id="polls">
    <h2>Polls</h2>
    <p>Here are the latest community polls.</p>

    <div class="community-actions">
      <button>👍 Like</button>
      <button>🔄 Share</button>
      <button>💬 Comment</button>
    </div>
  </section>

  <section id="announcements">
    <h2>Announcements</h2>
    <p>Stay updated with the latest news and announcements.</p>

    <div class="community-actions">
      <button>👍 Like</button>
      <button>🔄 Share</button>
      <button>💬 Comment</button>
    </div>
  </section>

</body>
</html>
