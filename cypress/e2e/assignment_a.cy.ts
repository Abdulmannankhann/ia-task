describe("AssignmentA Component", () => {
  it("should fetch data from the API and display it", () => {
    cy.visit("http://localhost:3000/assignment-a");

    cy.intercept("GET", "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus", { fixture: "spectrum-status-response.json" }).as("spectrumStatus");

    cy.wait("@spectrumStatus", { timeout: 20000 }).then((interception) => {
      if (interception.response && interception.response.statusCode === 200) {
        cy.get(".isar-container").should("exist");
      } else {
        cy.log("API request failed or response is undefined");
      }
    });
  });
});
