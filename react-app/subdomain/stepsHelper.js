const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const performSteps = async (steps) => {
  for (const step of steps) {
    await sleep(1000);
    console.log(JSON.stringify(step));
    switch (step?.type) {
      case "input":
        const input = document.querySelector(step?.selector);
        input.focus();
        input.setAttribute("value", step?.name);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        break;
      case "buttonClick":
        const buttons = document.querySelectorAll(step?.selector);
        let buttonToClick;
        if (step?.innerHTML) {
          buttons.forEach((btn) => {
            if (btn.innerHTML === step?.innerHTML) {
              buttonToClick = btn;
            }
          });
        } else {
          buttonToClick = buttons[0];
        }
        if (buttonToClick) {
          buttonToClick.click();
        }
        break;
      default:
        console.error("unexpected step type - " + step.type);
    }
  }
};
