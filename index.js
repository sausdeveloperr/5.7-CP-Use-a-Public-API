import express from "express";
import axios from "axios"; 

const app = express();
const port = 3000; 
const API_URL = "https://restcountries.com/v3.1";
const nameEndpoint = (countryName) => `/name/${encodeURIComponent(countryName)}?fullText=true`;
// const otherEndpoints = "blablabla"
const endpointFields = "&fields=name,capital,region,subregion,population,car,timezones,currencies,languages,flags,demonyms,startOfWeek,unMember,idd,landlocked";

//app config
app.use(express.static("public"));           
app.use(express.urlencoded({ extended: true }));                  
app.set("view engine", "ejs");

// Home route 
app.get("/", (req, res) => {
  res.render("index", { content: null });
});

// helper functions
const handleResponse = (res, responseObj) => {
  res.render("index", { content: responseObj.data }); 
};

const handleError = (res, error) => {
  if (error.response && error.response.status === 404) {
    console.error("API Error:", error.response.data);
    res.status(404).render("index", { content: "Country not found. Try a different spelling." });
  } else {
    console.error("API Error:", error);
    res.status(500).render("index", { content: "An error occurred. Please try again." });
  }
};

// TODOs
// - ✅ Handle edge cases (e.g., empty input(already handled by FE required attr).
// - In V2: typing NGA, RSA, USA, UK, england and similar cases instead of Nigeria, South Africa, United States)
// - In V2: use selected filter in frontend form to reroute from /name endpoint to other endpoints (e.g., /capital, /currency, /lang etc) for more specific search results. This will require some changes to the FE form (e.g., adding a dropdown for filter selection) and the BE route handler (e.g., using a switch case to determine which endpoint to call based on the selected filter). countryName become searchQuery

// fetch country data
app.post("/search", async (req, res) => {  

  const countryName = req.body.countryName.trim();

  try {
    console.log(`${API_URL}${nameEndpoint(countryName)}${endpointFields}`);
    const responseObj = await axios.get(`${API_URL}${nameEndpoint(countryName)}${endpointFields}`);
    handleResponse(res, responseObj);
  } catch (error) {
    handleError(res, error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});