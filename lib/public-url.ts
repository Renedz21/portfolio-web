export function getPublicUrl(path = "") {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
}
