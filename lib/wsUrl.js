const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://ws.case-clicker.com";
export default url;
