import translate from "google-translate-api-x";
async function translateText(text, targetLanguage) {
  
 try {
   const res = await translate(text, { to: targetLanguage });
   console.log(`النص الأصلي: ${text}`);
   console.log(`الترجمة: ${res.text}`);
   return res.text;
 } catch (err) {
   return null
 }
}
export {translateText};