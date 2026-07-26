const fs = require('fs');

async function checkAvailableModels() {
  const envFile = fs.readFileSync('.env.local', 'utf8');
  const keyMatch = envFile.match(/GEMINI_API_KEY=(.*)/);
  const key = keyMatch ? keyMatch[1].trim() : '';
  
  if (!key) {
    console.error("No API key found in .env.local");
    return;
  }

  let models = [];
  let pageToken = "";
  do {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}${pageToken ? '&pageToken=' + pageToken : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.models) models.push(...data.models.map(m => m.name));
    pageToken = data.nextPageToken;
  } while (pageToken);
  
  console.log("All models:", models);
}

checkAvailableModels();
