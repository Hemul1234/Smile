export default function normalizeDataObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(normalizeDataObject);
  }
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key === '_id' ? 'id' : key,
        normalizeDataObject(value)
      ])
    );
  }
  return obj;
}