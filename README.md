# SafeContract Studio v4 — 多頁式金融科技研究平台

本版基於 v3 功能重構視覺與導覽。採用固定側邊欄、八個獨立工作頁、手機抽屜導覽、淺色／深色切換、精簡 CSS 動畫與清楚的研究限制揭露。

## 開啟

```bash
python -m http.server 8000
```

開啟 http://localhost:8000 。可由左側導覽進入各個頁面，亦可透過 URL hash 直接連結（例如 `#demo`）。

## 測試

安裝 Node.js 20+，執行 `npm test`。測試涵蓋 JavaScript 交易狀態機與進階分析邏輯；不代表 Solidity 合約已鏈上驗證或安全審計。

## GitHub Pages

將整個資料夾內容上傳到 GitHub repository 根目錄；Settings → Pages → Deploy from a branch → main → /(root)。

## 限制

- JavaScript 模擬資金與交易流程，並非真實金流。
- Solidity 程式碼僅供研究與教育，未經鏈上測試或審計。
- 風險分析為規則式提醒，非 AI 模型或詐騙機率。
- 請勿輸入個人資料、助記詞、私鑰。
