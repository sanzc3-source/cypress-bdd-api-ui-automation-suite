class CartPage {
  assertCartVisible() {
    cy.get("body").should("contain.text", "Shopping Cart");
  }

  assertCartHasAtLeastNItems(n) {
    cy.get("#cart_info_table tbody tr").should("have.length.at.least", n);
  }

  assertEachLineHasValidPriceQtyTotalForFirstN(n) {
    cy.get("#cart_info_table tbody tr").then(($rows) => {
      const count = Math.min(n, $rows.length);

      for (let i = 0; i < count; i++) {
        const row = $rows[i];

        const priceText = row.querySelector(".cart_price")?.innerText || "";
        const qtyText = row.querySelector(".cart_quantity")?.innerText || "";
        const totalText = row.querySelector(".cart_total")?.innerText || "";

        const price = this._moneyToNumber(priceText);
        const qty = this._qtyToNumber(qtyText);
        const total = this._moneyToNumber(totalText);

        expect(price, `row ${i + 1} price`).to.be.greaterThan(0);
        expect(qty, `row ${i + 1} qty`).to.be.greaterThan(0);
        expect(total, `row ${i + 1} total`).to.be.greaterThan(0);

        expect(total, `row ${i + 1} total should equal price * qty`).to.eq(price * qty);
      }
    });
  }

  _moneyToNumber(text) {
    // Handles "Rs. 500" or "₹500" or "$500"
    const cleaned = String(text).replace(/[^0-9.]/g, "");
    return Number(cleaned || 0);
  }

  _qtyToNumber(text) {
    // Quantity is usually "1" in the cell
    const cleaned = String(text).replace(/[^0-9]/g, "");
    return Number(cleaned || 0);
  }

    assertCartHasExactlyNItems(n) {
    cy.get("#cart_info_table tbody tr").should("have.length", n);
  }

  removeItemByIndex(index) {
    cy.get("#cart_info_table tbody tr")
      .should("have.length.greaterThan", index)
      .eq(index)
      .within(() => {
        // AutomationExercise uses a small "X" remove icon link
        cy.get(".cart_delete a").click();
      });

    // Wait for the row to be removed from DOM
    cy.get("#cart_info_table tbody tr").should("have.length.at.most", index + 1);
  }
}

export default CartPage;
