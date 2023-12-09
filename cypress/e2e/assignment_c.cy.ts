describe("Assignment C Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/assignment-c");
  });

  it("displays the suggestion card and its content", () => {
    cy.get(".isar-container").should("exist");

    cy.contains("Suggestion for potential improvements in current Api structure").should("exist");

    cy.get(".accordion").should("exist");

    cy.get(".accordion-item").should("have.length", 8);
  });
});
