export const file2Base64 = (file: File) => new Promise<string | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as unknown as string);
    reader.onerror = reject;
});