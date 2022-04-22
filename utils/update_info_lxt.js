(async function () {
  const basePath = process.cwd();
  const fs = require("fs");
  const yesno = require("yesno");

  const {
    baseUri,
    description,
    namePrefix,
  } = require(`${basePath}/src/config.js`);

  // read json data
  let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
  let data = JSON.parse(rawdata);

  console.log("Info will be updated using the config.js data.");
  const updateName = await yesno({
    question: `Update names?`,
    defaultValue: "y",
  });
  const updateDescription = await yesno({
    question: `Update descriptions?`,
    defaultValue: "y",
  });
  const updateBaseUri = await yesno({
    question: `Update images base URI?`,
    defaultValue: "y",
  });

  data.forEach((item) => {
    //if (updateName) item.name = `${namePrefix} #${item.edition}`;
    if (updateName) item.name = `${namePrefix} #${item.custom_fields.edition}`;
    if (updateDescription) item.description = description;
    if (updateBaseUri) {
      item.image = `${baseUri}/${item.custom_fields.edition}.png`;
      item.file_url = `${baseUri}/${item.custom_fields.edition}.png`;
    }

    fs.writeFileSync(
      `${basePath}/build/json/${item.custom_fields.edition}.json`,
      JSON.stringify(item, null, 2)
    );
  });

  fs.writeFileSync(
    `${basePath}/build/json/_metadata.json`,
    JSON.stringify(data, null, 2)
  );

  if (updateName)
    console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  if (updateBaseUri)
    console.log(`Updated baseUri for images to ===> ${baseUri}`);
  if (updateDescription)
    console.log(`Updated description for images to ===> ${description}`);
})();
