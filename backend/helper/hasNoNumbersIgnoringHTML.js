function hasNoNumbersIgnoringHTML(str) {
 try {
  const strippedStr = str.replace(/<[^>]*>/g, "");
 return !/^\d+$/.test(strippedStr);
 } catch (error) {
  return false;
 }
}
export { hasNoNumbersIgnoringHTML };
