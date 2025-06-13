export function formatPostPath(slug: String) {
  const [year, month, day, ...titleParts] = slug.split('-');
  return `/${year}/${month}/${day}/${titleParts.join('-')}`;
} 