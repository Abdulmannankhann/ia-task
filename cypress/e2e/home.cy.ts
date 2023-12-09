describe("Home Page", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".spectrum__video").should("exist");

    cy.get("#successfully-sent").should("exist");

    cy.contains("Welcome to My Assignment!").should("exist");

    cy.contains("Dear Isar Aerospace Team").should("exist");

    cy.contains("Abdul Mannan Khan").should("exist");
  });
});
