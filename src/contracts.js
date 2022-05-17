let contracts = [];
let backendURL = "";

if (process.env.NODE_ENV === "development") {
  backendURL = "http://localhost:5001/propex-staging/us-central1/v1"
}
else {
  backendURL = "https://us-central1-propex-staging.cloudfunctions.net/v1";
}

export default contracts;
export { backendURL };

const personaTemplateId = "itmpl_N7TG9na74MYTSXeCB34VBBYU";
export { personaTemplateId }