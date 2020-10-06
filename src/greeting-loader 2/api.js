export const loadGreeting = (_value, succuess = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succuess) {
        resolve({ data: "value" });
      } else {
        reject({ message: "error" });
      }
    }, 2000);
  });
};
