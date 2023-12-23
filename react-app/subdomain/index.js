import request from "../redux/request";
import { sortSteps } from "../utils/stepHelper";
import { performSteps } from "./stepsHelper";
import { getHostReplacedSubdomainWith } from "./urlHelper";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

window.addEventListener("load", async () => {
  const host = getHostReplacedSubdomainWith("www");
  const response = await request.get(`//${host}/api/steps`);
  const steps = response.data.steps;
  const sortedSteps = sortSteps(steps);
  performSteps(sortedSteps);
  // await sleep(1000);
  // const input = document.querySelector("input");
  // input.focus();
  // input.setAttribute("value", "test Value");
  // await sleep(1000);
  // input.dispatchEvent(new Event("input", { bubbles: true }));
  // await sleep(1000);
  // const button = document.querySelector("button");
  // button.click();
});
