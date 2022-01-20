const fs = require("fs");

const resumeJsonString = fs.readFileSync("resume.json");
const resumeJson = JSON.parse(resumeJsonString);

function standardise(json) {
  json.work.forEach((work) => {
    const standardisedHighlights = work.highlights.map((highlight) => {
      if (highlight.endsWith(".")) {
        return highlight;
      }
      return highlight + ".";
    });
    work.highlights = standardisedHighlights;

    if (work.skills) {
      const orderedSkills = work.skills.sort();
      work.skills = orderedSkills;
    }
  });

  json.education.forEach((education) => {
    const standardisedCourses = education.courses.map((courses) => {
      if (courses.endsWith(".")) {
        return courses;
      }
      return courses + ".";
    });
    education.courses = standardisedCourses;
  });

  const jsonString = JSON.stringify(json, null, 2);
  fs.writeFileSync("resume.json", jsonString);
}

standardise(resumeJson);
