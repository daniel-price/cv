const fs = require("fs");
const handlebars = require("handlebars");
const handlebarsWax = require("handlebars-wax");

function formatDate(date) {
  return date.length === 4
    ? date
    : new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
}

function removeProtocol(url) {
  return url.replace(/.*?:\/\/www\./g, "");
}

function concat() {
  return Object.values(arguments)
    .filter((item) => typeof item === "string")
    .join("");
}

function concatAsList() {
  return Object.values(arguments[0])
    .filter((item) => typeof item === "string")
    .join(", ");
}

function render(resume) {
  const dir = `${__dirname}/public`;
  var css = fs.readFileSync(`${dir}/styles/main.css`, "utf-8");
  const resumeTemplate = fs.readFileSync(`${dir}/views/resume.hbs`, "utf-8");

  const wax = handlebarsWax(handlebars)
    .partials(`${dir}/views/partials/**/*.{hbs,js}`)
    .partials(`${dir}/views/components/**/*.{hbs,js}`);

  return wax.compile(resumeTemplate)({ css, resume });
}

handlebars.registerHelper({ formatDate, removeProtocol, concat, concatAsList });

module.exports = { render };
