export function TimeFormat (time: string | Date) {
  return new Date(time).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
}