import "./index.css";
import { jsonToSchema } from "../lib";

const setup = () => {
  const jsonTextarea = document.getElementById("json");
  const graphqlTextarea = document.getElementById("graphql");

  const setGraphQLResult = () => {
    if (!jsonTextarea.value) {
      graphqlTextarea.value = "";
      return;
    }

    try {
      const jsonObject = JSON.parse(jsonTextarea.value);
      jsonTextarea.value = JSON.stringify(jsonObject, null, 2);
      jsonTextarea.classList.remove("invalid");

      const schema = jsonToSchema({ jsonInput: jsonTextarea.value });
      graphqlTextarea.value = schema.value;
    } catch (error) {
      jsonTextarea.classList.add("invalid");
      graphqlTextarea.value = `Bad JSON:\n${error.message}`;
      return;
    }
  };

  const typingTimerLength = 1000;
  let timerId = null;

  jsonTextarea.addEventListener(
    "input",
    () => {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }

      timerId = setTimeout(() => {
        setGraphQLResult();
      }, typingTimerLength);
    },
    false
  );
  setGraphQLResult();
};

document.addEventListener("DOMContentLoaded", setup);
