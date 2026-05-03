// import translate from "google-translate-api-x";
// async function translateText(text:string, targetLanguage:string) {
//  const res = await fetch("https://libretranslate.com/translate", {
//   method: "POST",
//   body: JSON.stringify({
//    q: "",
//    source: "auto",
//    target: "en",
//    format: "text",
//    alternatives: 3,
//    api_key: ""
//   }),
//   headers: { "Content-Type": "application/json" }
//  });
//  console.log('====================================');
//  console.log(res);
//  console.log('====================================');
//  return "here";
// }
async function translateText(text: string, targetLanguage: string) {
 try {
     const response = await fetch('http://localhost:5000/translate', {
      method: "POST",
         q: text,
         source: 'auto', 
         target: targetLanguage,
         format: 'text',
     });
     return response.data.translatedText;
 } catch (error: any) {
     console.error('Translation error:', error.message);
     throw new Error('Failed to translate.');
 }
}
export {translateText};
