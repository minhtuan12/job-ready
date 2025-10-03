export function getResourceType(mimeType) {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";

  // Word, PDF, Excel, Zip... => raw
  return "raw";
}