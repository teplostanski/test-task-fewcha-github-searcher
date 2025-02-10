export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};