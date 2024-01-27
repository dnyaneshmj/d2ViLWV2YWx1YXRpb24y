/*
 * Numeric Input Component
 *   HTML (initial state): <input type="text" class="c-numeric-input" />
 *   Requirement:
 *   - should only accept numeric value only such as: 1, 1.2, -5, or 1000
 *   - if user enters leading zero, or .  when user moves focus away from the input, it should
 *     change to correct format:
 *       .1 ==> 0.1 and 01 => 1
 *   - if user enter invalid character/value, HTML should change to this
 *       <input type="text" class="c-numeric-input c-numeric-input--error" />
 *       <span class="c-numeric-input__error-msg">invalid input</span>
 *   - if user enter valid value and move focus away from the input HTML should change to this:
 *       <input type="text" class="c-numeric-input c-numeric-input--valid" />
 *   - if user focus on the input or user clear value from the input,
 *     HTML should return to initial stage
 *
 * Lastly, please add some css for c-numeric-input--error and c-numeric-input--valid to show
 * red or green border to the input
 * */

const NumericInput = {
  addError: (elem) => {
    elem.classList.add("c-numeric-input--error");
    elem.style.borderColor = "red";
  },
  init: () => {
    document.querySelectorAll(".c-numeric-input").forEach((elem) => {
      let value;
      const span = document.createElement("span");
      span.innerText = "invalid input";
      span.classList.add("c-numeric-input__error-msg");

      elem.addEventListener("input", function () {
        value = Number(elem.value);

        elem.classList.contains("c-numeric-input--valid") &&
          elem.classList.remove("c-numeric-input--valid");

        if (isNaN(value)) {
          NumericInput.addError(elem);
          !span.isConnected && elem.after(span);
        } else {
          elem.classList.remove("c-numeric-input--error");
          span.isConnected && span.remove();
          elem.removeAttribute("style");
        }
      });

      elem.addEventListener("focusout", function () {
        if (value && !isNaN(value)) {
          elem.classList.add("c-numeric-input--valid");
          elem.style.borderColor = "green";
          elem.value = value;
        }
      });
    });
  },
};
document.addEventListener("DOMContentLoaded", NumericInput.init);
