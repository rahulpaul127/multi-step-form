    const app = document.querySelector("#app");
    const form = document.querySelector("#multiStepForm");
    const stepPanels = document.querySelectorAll("[data-step-panel]");
    const stepIndicators = document.querySelectorAll("[data-step-indicator]");
    const backButton = document.querySelector("#backButton");
    const nextButton = document.querySelector("#nextButton");
    const actions = document.querySelector("#actions");
    const billingSwitch = document.querySelector("#billingSwitch");
    const billingButtons = document.querySelectorAll("[data-billing]");
    const planCards = document.querySelectorAll("[data-plan]");
    const addonCheckboxes = document.querySelectorAll(".addon-checkbox");

    const plans = {
      arcade: { label: "Arcade", monthly: 9, yearly: 90 },
      advanced: { label: "Advanced", monthly: 12, yearly: 120 },
      pro: { label: "Pro", monthly: 15, yearly: 150 }
    };

    const addons = {
      online: { label: "Online service", monthly: 1, yearly: 10 },
      storage: { label: "Larger storage", monthly: 2, yearly: 20 },
      profile: { label: "Customizable profile", monthly: 2, yearly: 20 }
    };

    const state = {
      step: 1,
      plan: "arcade",
      billing: "monthly",
      addons: ["online", "storage"]
    };

    function billingSuffix() {
      return state.billing === "monthly" ? "mo" : "yr";
    }

    function billingLabel() {
      return state.billing === "monthly" ? "Monthly" : "Yearly";
    }

    function formatPrice(amount, prefix = "") {
      return `${prefix}$${amount}/${billingSuffix()}`;
    }

    function updateStepVisibility() {
      stepPanels.forEach((panel) => {
        panel.classList.toggle("is-active", Number(panel.dataset.stepPanel) === state.step);
      });

      const activeIndicator = Math.min(state.step, 4);
      stepIndicators.forEach((item) => {
        const isCurrent = Number(item.dataset.stepIndicator) === activeIndicator;
        if (isCurrent) {
          item.setAttribute("aria-current", "step");
        } else {
          item.removeAttribute("aria-current");
        }
      });

      actions.classList.toggle("is-hidden", state.step === 5);
      backButton.classList.toggle("is-hidden", state.step === 1);
      nextButton.textContent = state.step === 4 ? "Confirm" : "Next Step";
      nextButton.classList.toggle("confirm", state.step === 4);
    }

    function updatePlans() {
      app.classList.toggle("is-yearly", state.billing === "yearly");

      planCards.forEach((card) => {
        const isSelected = card.dataset.plan === state.plan;
        card.classList.toggle("is-selected", isSelected);
        card.setAttribute("aria-checked", String(isSelected));
      });

      Object.keys(plans).forEach((key) => {
        document.querySelector(`[data-plan-price="${key}"]`).textContent = formatPrice(plans[key][state.billing]);
      });
    }

    function updateBilling() {
      billingSwitch.setAttribute("aria-checked", String(state.billing === "yearly"));
      billingButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.billing === state.billing);
      });
    }

    function updateAddons() {
      Object.keys(addons).forEach((key) => {
        document.querySelector(`[data-addon-price="${key}"]`).textContent = formatPrice(addons[key][state.billing], "+");
      });

      addonCheckboxes.forEach((checkbox) => {
        const isSelected = state.addons.includes(checkbox.value);
        checkbox.checked = isSelected;
        checkbox.closest(".addon-card").classList.toggle("is-selected", isSelected);
      });
    }

    function updateSummary() {
      const selectedPlan = plans[state.plan];
      const planCost = selectedPlan[state.billing];
      const selectedAddons = state.addons.map((key) => addons[key]);
      const addonsCost = selectedAddons.reduce((total, addon) => total + addon[state.billing], 0);
      const total = planCost + addonsCost;
      const summaryAddons = document.querySelector("#summaryAddons");

      document.querySelector("#summaryPlanName").textContent = `${selectedPlan.label} (${billingLabel()})`;
      document.querySelector("#summaryPlanPrice").textContent = formatPrice(planCost);
      document.querySelector("#totalLabel").textContent = state.billing === "monthly" ? "Total (per month)" : "Total (per year)";
      document.querySelector("#totalPrice").textContent = formatPrice(total, "+");

      summaryAddons.innerHTML = selectedAddons.map((addon) => `
        <div class="summary-row">
          <span>${addon.label}</span>
          <span class="summary-row-price">${formatPrice(addon[state.billing], "+")}</span>
        </div>
      `).join("");
    }

    function render() {
      updateStepVisibility();
      updatePlans();
      updateBilling();
      updateAddons();
      updateSummary();
    }

    function setFieldError(input, message) {
      const error = document.querySelector(`#${input.id}-error`);
      input.setAttribute("aria-invalid", message ? "true" : "false");
      error.textContent = message;
    }

    function validatePersonalInfo() {
      const fields = [
        document.querySelector("#name"),
        document.querySelector("#email"),
        document.querySelector("#phone")
      ];
      let isValid = true;

      fields.forEach((input) => {
        const value = input.value.trim();

        if (!value) {
          setFieldError(input, "This field is required");
          isValid = false;
          return;
        }

        if (input.id === "name" && !/^[a-zA-Z\s\-']+$/.test(value)) {
          setFieldError(input, "Invalid format, letters only");
          isValid = false;
          return;
        }

        if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setFieldError(input, "Invalid email address");
          isValid = false;
          return;
        }

        if (input.id === "phone" && !/^\+?[\d\s\-()]+$/.test(value)) {
          setFieldError(input, "Invalid format, numbers only");
          isValid = false;
          return;
        }

        setFieldError(input, "");
      });

      if (!isValid) {
        const invalidField = fields.find((input) => input.getAttribute("aria-invalid") === "true");
        invalidField.focus();
      }

      return isValid;
    }

    function goNext() {
      if (state.step === 1 && !validatePersonalInfo()) {
        return;
      }

      if (state.step === 4) {
        state.step = 5;
      } else {
        state.step += 1;
      }

      render();
    }

    function goBack() {
      if (state.step > 1) {
        state.step -= 1;
        render();
      }
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      goNext();
    });

    nextButton.addEventListener("click", goNext);
    backButton.addEventListener("click", goBack);

    document.querySelectorAll(".text-input").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") {
          setFieldError(input, "");
        }
      });
    });

    planCards.forEach((card) => {
      card.addEventListener("click", () => {
        state.plan = card.dataset.plan;
        render();
      });
    });

    billingSwitch.addEventListener("click", () => {
      state.billing = state.billing === "monthly" ? "yearly" : "monthly";
      render();
    });

    billingButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.billing = button.dataset.billing;
        render();
      });
    });

    addonCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selected = new Set(state.addons);
        if (checkbox.checked) {
          selected.add(checkbox.value);
        } else {
          selected.delete(checkbox.value);
        }
        state.addons = Array.from(selected);
        render();
      });
    });

    document.querySelector("#changePlan").addEventListener("click", () => {
      state.step = 2;
      render();
    });

    render();
