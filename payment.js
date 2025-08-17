 document.getElementById("paymentForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const cardNumber = document.getElementById("cardNumber").value.trim();
      const expiryDate = document.getElementById("expiryDate").value.trim();
      const cvv = document.getElementById("cvv").value.trim();

      if (!/^\d{16}$/.test(cardNumber)) {
        alert("Invalid Card Number (must be 16 digits).");
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        alert("Invalid Expiry Date (format MM/YY).");
        return;
      }

      if (!/^\d{3}$/.test(cvv)) {
        alert("Invalid CVV (must be 3 digits).");
        return;
      }

      alert("Payment Successful!");
    });

    // Back to Top button show/hide
    window.addEventListener("scroll", function () {
      const backToTop = document.querySelector(".back-to-top");
      if (window.scrollY > 200) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    // Smooth scroll to top
    document.querySelector(".back-to-top a").addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });