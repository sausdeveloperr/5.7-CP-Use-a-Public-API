import express from "express";
import axios from "axios"; 

const app = express();
const port = 3000; 
const API_URL = "https://restcountries.com/v3.1";
const endpointFields = "fields=name,capital,cca3,region,subregion,population,car,timezones,currencies,languages,flags,demonyms,startOfWeek,unMember,idd,landlocked";

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
  const data = Array.isArray(responseObj.data) 
    ? responseObj.data 
    : [responseObj.data];   // wrap single object in array

  res.render("index", { content: data });
};

const handleError = (res, error) => {
  if (error.response && error.response.status === 404) {
    console.error("API Error:", error.response.data);
    res.status(404).render("index", { content: "Country not found. Try a different spelling or filter." });
  } else {
    console.error("API Error:", error);
    res.status(500).render("index", { content: "An error occurred. Please try again." });
  }
};

// fetch country data
app.post("/search", async (req, res) => {  
  const { searchInput, searchType } = req.body;
  const query = searchInput.trim();
  let endpoint = '';

  if (query.length <= 3) {    
    endpoint = `/alpha/${query.toUpperCase()}?`;
  } else {
    switch (searchType) {
      case 'name':     endpoint = `/name/${encodeURIComponent(query)}?fullText=true&`; break; 
      case 'alpha':    endpoint = `/alpha/${query.toUpperCase()}?`; break; 
      case 'capital':  endpoint = `/capital/${encodeURIComponent(query)}?`; break;
      case 'region': endpoint = `/region/${encodeURIComponent(query)}?`; break; 
      case 'currency': endpoint = `/currency/${encodeURIComponent(query)}?`; break;
      case 'language': endpoint = `/lang/${encodeURIComponent(query)}?`; break;
      case 'demonym':  endpoint = `/demonym/${encodeURIComponent(query)}?`; break;
      default: 
        endpoint = `/name/${encodeURIComponent(query)}?fullText=true&`;
        break;
    }
  }

  try {
    const responseObj = await axios.get(`${API_URL}${endpoint}${endpointFields}`);
    handleResponse(res, responseObj);
  } catch (error) {
    handleError(res, error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});