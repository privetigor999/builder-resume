export const animatedScroll = () => {
  return window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
