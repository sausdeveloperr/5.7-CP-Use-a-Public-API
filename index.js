import express from "express";
import axios from "axios"; 

const app = express();
const port = 3000; 
const API_URL = "https://restcountries.com/v3.1";
const nameEndpoint = (countryName) => `/name/${encodeURIComponent(countryName)}?fullText=true`;
// const otherEndpoints = "blablabla"
const endpointFields = "&fields=name,capital,region,subregion,population,car,timezones,currencies,languages,flags,demonyms,startofweek,unmember,idd,landlocked";

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
  console.log(responseObj.data);
  res.render("index", { content: responseObj.data }); 
  // res.render("index", { content: JSON.stringify(responseObj.data) });
};

const handleError = (res, error) => {
  if (error.response && error.response.status === 404) {
    console.error("API Error:", error.response.data);
    res.status(404).render("index", { content: "Country not found. Please type it correctly or fully." });
  } else {
    console.error("API Error:", error);
    res.status(500).render("index", { content: "An error occurred. Please try again." });
  }
};

// fetch country data
app.post("/search", async (req, res) => {
  // TODOs
// - Handle edge cases (e.g., empty input(already handled by FE reuired attr), 
// typing NGA, RSA, USA, UK, england and similar cases instead of Nigeria, South Africa, United States)

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