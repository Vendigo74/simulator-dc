const fakeFetch = (option) => new Promise(
  resolve => {
  setTimeout(() => {
  resolve(option + 300);
  }, 4000);
  }
  );

  export default fakeFetch;