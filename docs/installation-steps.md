# Installation steps

These are the detailed, click-by-click steps to install Gscreener. They're written so an AI agent
can do them for you — see [Installation by an AI agent](../README.md#installation-by-an-ai-agent)
in the README — but you can follow them by hand too.

**In step 44, you manually need to grant the necessary permission. **

One action per step. Code links open the **raw** file, so `⌘A`/`Ctrl+A` selects exactly what you
need to copy.

1. Go to [script.google.com](https://script.google.com).
2. Click **New project**.
3. Click the project name at the top (it says **Untitled project**).
4. Rename it to `Gscreener`.
5. In the left sidebar, click the **gear icon** (that's Project Settings — the label isn't shown).
6. Check **"Show `appsscript.json` manifest file in editor"**.
7. Click the **`<>` (Editor)** icon in the left sidebar to get back to the code.
8. Click `appsscript.json` in the Files list.
9. Select everything and replace it with the contents of
   [`appsscript.json` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/appsscript.json).
   If your digest should arrive on a different clock, change `timeZone` to your
   [IANA time zone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
10. Press `⌘S`/`Ctrl+S` to save.
11. In the Files list, hover over `Code.gs` and click the **⋮** (three-dot) menu that appears.
12. Choose **Rename**.
13. Type `Config` — no extension — and press **Enter**. (Every new project starts with a file
    called `Code.gs`; renaming it keeps your files matching this repo one-to-one.)
14. Select everything in it and replace it with the contents of
    [`Config.js` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/Config.js).
15. Save (`⌘S`/`Ctrl+S`).
16. Click the **＋** next to "Files".
17. Choose **Script**.
18. Type `Setup` as the name — just `Setup`, no extension. (The editor adds `.gs` itself; typing
    `Setup.js` gets you a messy `Setup.js.gs`.)
19. Paste in the contents of
    [`Setup.js` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/Setup.js).
20. Save (`⌘S`/`Ctrl+S`).
21. Click the **＋** next to "Files".
22. Choose **Script**.
23. Type `Screener` as the name — no extension.
24. Paste in the contents of
    [`Screener.js` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/Screener.js).
25. Save (`⌘S`/`Ctrl+S`).
26. Click the **＋** next to "Files".
27. Choose **Script**.
28. Type `Digest` as the name — no extension.
29. Paste in the contents of
    [`Digest.js` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/Digest.js).
30. Save (`⌘S`/`Ctrl+S`).
31. Click the **＋** next to "Files".
32. Choose **Script**.
33. Type `WebApp` as the name — no extension.
34. Paste in the contents of
    [`WebApp.js` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/WebApp.js).
35. Save (`⌘S`/`Ctrl+S`).
36. Click the **＋** next to "Files".
37. Choose **Script**.
38. Type `AddOn` as the name — no extension.
39. Paste in the contents of
    [`AddOn.js` (raw)](https://raw.githubusercontent.com/neerajsingh0101/gscreener/main/src/AddOn.js).
40. Save (`⌘S`/`Ctrl+S`).
41. Click `Setup.gs` in the Files list. (The toolbar's function dropdown only lists functions
    from the file that's currently open — and only once it's saved.)
42. In the toolbar, open the function dropdown (next to **Debug**), choose **`setup`**, and click
    **Run**.
43. Authorize when asked. You'll see **"Google hasn't verified this app"** — click
    **Advanced → Go to Gscreener (unsafe)**. "Unsafe" only means Google didn't audit it: the
    code is this repo, running under your own account, visible to no one else.
44. Grant the Gmail permissions. The script asks for the minimum it needs: modify labels
    (`gmail.modify`), manage filters (`gmail.settings.basic`), manage its own triggers, and run
    as a Gmail add-on (the [side panel](../README.md#making-gmail-side-panel-work)).
45. Click **Deploy** (top right).
46. Click **New deployment**.
47. Click the gear next to "Select type" and choose **Web app**.
48. In the **Description** box, type `Gscreener dashboard`. (It's just a label for this
    deployment — it has no effect on behavior.)
49. *Execute as:* should already show **Me (your email)** — leave it.
50. Set *Who has access:* to **Only myself**.
51. Click **Deploy**.
52. Copy the web app URL and bookmark it — that's your screening dashboard, and the digest's
    👍/👎 buttons go through it too.

That's it. Screening starts immediately: new senders pile up in `Gscreener/Pending`, your digest
arrives daily at 8am (change `DIGEST_HOUR` in `Config.js`), and the dashboard is at the web app URL.

