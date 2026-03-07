import express from "express";
import axios from "axios"; 

const app = express();
const port = 3000; 
const API_URL = "https://restcountries.com/v3.1";
const nameEndpoint = (countryName) => `/name/${encodeURIComponent(countryName)}`;
// const otherEndpoints = "blablabla"
const endpointFields = "?fields=name,capital,region,subregion,population,car,timezones,currencies,languages,flags,demonyms,startofweek,unmember,idd,landlocked";

// Middleware
app.use(express.static("public"));           
app.use(express.urlencoded({ extended: true }));                  

// view engine
app.set("view engine", "ejs");

// Home route 
app.get("/", (req, res) => {
  res.render("index", { content: null });
});

// helper functions
const handleResponse = (res, responseObj) => {
  console.log(responseObj.data);
  // res.render("index", { content: JSON.stringify(responseObj.data) });
};

const handleError = (res, error) => {
  console.error("API Error:", error);
  res.status(500).render("index", { message: "An error occurred. Please try again." });
};

// fetch country data
app.post("/search", async (req, res) => {
  const countryName = req.body.countryName.trim();
  console.log(`Searching for country: ${countryName}`);

  try {
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