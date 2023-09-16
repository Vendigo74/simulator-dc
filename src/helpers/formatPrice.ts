export const formatPrice = (price: number) => `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
