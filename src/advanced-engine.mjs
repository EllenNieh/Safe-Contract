export const indicators=[
 {label:'要求提供私鑰、助記詞或驗證碼',pattern:/助記詞|私鑰|驗證碼|OTP|seed phrase|private key/i,points:35,tip:'不要提供錢包助記詞、私鑰或一次性驗證碼。'},
 {label:'要求先繳交解凍費、保證金或手續費',pattern:/解凍費|保證金|手續費|稅金|解鎖費|先繳|先付/i,points:25,tip:'先查證收費是否來自可信的官方管道。'},
 {label:'催促立即處理或製造緊迫感',pattern:/立即|馬上|限時|最後機會|今天之內|倒數|逾期|緊急/i,points:15,tip:'先停止操作，不要因時間壓力而付款。'},
 {label:'宣稱保證獲利或穩賺不賠',pattern:/保證獲利|穩賺|零風險|高報酬|翻倍|保本/i,points:25,tip:'投資沒有保證獲利，應查證機構及商品資訊。'},
 {label:'要求點擊連結或轉往私人管道',pattern:/https?:\/\/|bit\.ly|短網址|點擊連結|加LINE|私訊|客服帳號/i,points:15,tip:'不要直接點陌生連結；自行查找官方網站。'},
 {label:'冒充官方或權威單位',pattern:/金管會|警察|檢察官|銀行客服|官方通知|帳戶凍結/i,points:20,tip:'透過獨立取得的官方電話或網站核實身分。'}
];
export function analyzeMessage(message){const s=String(message||'').trim();if(!s)return {score:0,level:'未輸入訊息',hits:[],advice:['請輸入要分析的文字。']};const hits=indicators.filter(x=>x.pattern.test(s));const score=Math.min(100,hits.reduce((a,x)=>a+x.points,0));return {score,level:score>=65?'多項高風險警訊':score>=30?'發現明顯警訊':score>0?'發現部分警訊':'未比對到既定警訊',hits:hits.map(({label,points,tip})=>({label,points,tip})),advice:hits.length?hits.map(x=>x.tip):['未命中規則不代表安全，請自行核實交易對象與付款管道。']}}
export const auditControls=[['身分與權限控管',18,'確認買方、賣方與仲裁者權限，防止未授權提款。'],['防止重複支付與重入',20,'遵循 Checks-Effects-Interactions，測試重入與重複請款。'],['逾期退款與例外流程',15,'設定期限、退款與無法交付時的處理方式。'],['爭議仲裁與可信證據',15,'定義仲裁者權限、證據來源及利益衝突處理。'],['安全事件紀錄',10,'紀錄付款、放款、退款與爭議事件以供稽核。'],['合約自動化測試',12,'涵蓋正常流程、非法角色、邊界條件與狀態轉移。'],['第三方安全審查與部署治理',10,'上線前進行外部審查、管理權限與升級策略檢視。']];
export function auditDesign(selected){const indexes=new Set(selected);const score=auditControls.reduce((s,c,i)=>s+(indexes.has(i)?c[1]:0),0);return {score,missing:auditControls.flatMap((c,i)=>indexes.has(i)?[]:[c[0]+'：'+c[2]])}}
export function estimateLoss({amount,risk,protect,fee}){for(const x of [amount,risk,protect,fee])if(!Number.isFinite(x))throw Error('請輸入有效數字');if(amount<=0||risk<0||risk>100||protect<0||protect>100||fee<0||fee>20)throw Error('輸入值超出合理範圍');const direct=amount*risk/100;const escrow=direct*(1-protect/100)+amount*fee/100;return {direct,escrow,difference:direct-escrow,feeAmount:amount*fee/100}}
export const story=[
 {title:'看見超低價商品',text:'你在社群看到一支市價 15,000 元的手機，賣家只賣 5,000 元，並說「現在不買就沒了」。',choices:[['立即匯款搶優惠',false,'價格異常與催促付款都是需要查證的警訊。'],['要求更多商品資訊並查證賣家',true,'先查證商品與交易對象，可降低衝動付款風險。']]},
 {title:'賣家要求改用陌生網站',text:'賣家傳來一個「專屬安全付款」網址，要求你離開原本的交易平台。',choices:[['點擊網址並輸入信用卡資料',false,'陌生付款連結可能是釣魚網站。'],['留在可信平台，從官方管道確認',true,'應避免跳轉到無法驗證的私人付款網站。']]},
 {title:'收到假客服訊息',text:'有人自稱客服，說你的訂單遭凍結，必須提供簡訊驗證碼才能退款。',choices:[['提供驗證碼',false,'一次性驗證碼不能交給陌生人。'],['拒絕提供並透過官方客服查證',true,'獨立驗證身分，避免交出帳戶控制權。']]},
 {title:'賣家要求提前放款',text:'你還沒收到商品，賣家說「先按確認收貨，我才會寄出」。',choices:[['先確認收貨',false,'提前確認可能使資金依規則釋放，增加損失風險。'],['等待實際交付並保留證據',true,'確認交付前不要授權釋放託管款項。']]}
];
