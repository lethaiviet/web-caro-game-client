export const getFirstLetter = (str: string): string => {
  if (str === "") return "A";
  return str.charAt(0).toUpperCase();
};

export const getAvatarTemplate = (name: string, size: number): string => {
  const firstLetter = getFirstLetter(name);
  return `https://via.placeholder.com/${size}?text=${firstLetter}`;
};
