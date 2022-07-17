let contracts = [];
let backendURL = "";
let blockScanner = "";

if (process.env.NODE_ENV === "development") {
  backendURL = "http://localhost:5001/propex-staging/us-central1/v1"
  blockScanner = "https://mumbai.polygonscan.com"
}
else {
  backendURL = "https://us-central1-propex-staging.cloudfunctions.net/v1";
  blockScanner = "https://polygonscan.com"
}

export default contracts;
export { backendURL, blockScanner };

const personaTemplateId = "itmpl_N7TG9na74MYTSXeCB34VBBYU";
export { personaTemplateId }