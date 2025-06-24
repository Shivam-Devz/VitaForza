// Handle resume form submission
document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const summary = document.getElementById("summary").value.trim();
  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((s) => s.trim());
  const experience = document.getElementById("experience").value.trim();
  const education = document.getElementById("education").value.trim();
  const certifications = document.getElementById("certifications").value.trim();
  const declaration = document.getElementById("declaration").value.trim();
  const languages = document.getElementById("languages").value.trim();

  const experienceSection = experience
    ? `<h3>Experience</h3><p>${experience.replace(/\n/g, "<br>")}</p>`
    : "";
  const certificationsSection = certifications
    ? `<h3>Certifications</h3><p>${certifications.replace(/\n/g, "<br>")}</p>`
    : "";
  const declarationSection = declaration
    ? `<h3>Declaration</h3><p>${declaration.replace(/\n/g, "<br>")}</p>`
    : "";

  const resumeHTML = `
    <div class="resume-header">
      <h2>${name}</h2>
    </div>

    <div class="resume-columns">
      <div class="left-column">
        <h3>Contact</h3>
        <p><strong>Email:</strong> ${email}<br>
           <strong>Phone:</strong> ${phone}<br>
           <strong>Address:</strong> ${address}</p>

        <h3>Skills</h3>
        <ul>${skills
          .filter((s) => s)
          .map((skill) => `<li>${skill}</li>`)
          .join("")}</ul>

        <h3>Languages</h3>
        <p>${languages}</p>
      </div>

      <div class="right-column">
        <h3>Summary</h3>
        <p>${summary}</p>

        ${experienceSection}

        <h3>Education</h3>
        <p>${education.replace(/\n/g, "<br>")}</p>

        ${certificationsSection}

        ${declarationSection}
      </div>
    </div>
  `;

  document.getElementById("resume").innerHTML = resumeHTML;
});

// Use iframe for better printing on mobile and desktop
document.getElementById("printBtn").addEventListener("click", function () {
  const resumeContent = document.getElementById("resume").innerHTML;

  // Create a hidden iframe
  const printFrame = document.createElement("iframe");
  printFrame.style.position = "absolute";
  printFrame.style.left = "-9999px";
  printFrame.style.top = "0";
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentWindow.document;

  // Clone in-page styles
  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("");
      } catch (e) {
        return ""; // Avoid CORS issues
      }
    })
    .join("");

  frameDoc.open();
  frameDoc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Resume</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="resume-output">
          ${resumeContent}
        </div>
      </body>
    </html>
  `);
  frameDoc.close();

  // Wait and print
  printFrame.onload = function () {
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 1000);
  };
});
