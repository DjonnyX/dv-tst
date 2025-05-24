export const byteArray2Base64 = (byteArray: Uint16Array) => {
  let binary = '';
  for (let i = 0, l = byteArray.byteLength; i < l; i++) {
    binary += String.fromCharCode(byteArray[i]);
  }
  return btoa(binary);
}