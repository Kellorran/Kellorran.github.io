/*
  Opções:
    1- Analisar sequência nucleotídica
    2- Analisar sequência de polipeptídica
    3- Converter códons para peptídeos
*/

const view_input = document.getElementById("sequence-input");
const view_output = document.getElementById("sequence-output");
const view_select = document.getElementById("function");
const view_mutate_options = document.getElementById("mutate-options");
const view_quantity_options = document.getElementById("quantity-options");
const view_quantity_function = document.getElementById("quantities-select");

const inputsList = Array.from(document.getElementsByTagName("input"));

inputsList.forEach((item) => (item.onchange = onInputChange));

view_quantity_function.onchange = onSelectQuantity;

let parameters = { specificQuantity: false };

view_input.onchange = (e) => removeLineBreak(e);
view_select.onchange = onSelectChange;

function mutate(sequence, position = 5, substitute = "") {
  const mutatedSequence = sequence
    .slice(0, position - 1)
    .concat(substitute, sequence.slice(position));

  return mutatedSequence;
}

function specificQuantity(sequence, letter) {
  console.log("specific");
  const letters = sequence.split("").filter((item) => item === letter);
  return letters.length;
}

const analysis = {
  mutate: (sequence) =>
    mutate(sequence, parameters.position, parameters.mutation),
  quantities: (sequence) =>
    parameters.specificQuantity
      ? specificQuantity(sequence, parameters.letter)
      : sequence
      ? sequence.length
      : null,
};

function analise() {
  console.log(parameters);
  const option = view_select.value;
  console.log(option);
  if (analysis[option]) {
    const input = view_input.value.replace(/\s/g, "");
    view_output.value = analysis[option](input);
  }
}

function removeLineBreak(e) {
  const { target } = e;

  target.value = target.value.replace(/\s/g, "");
}

function logValue(e) {
  console.log(e.target.value);
}

// const children = Array.from(view_mutate_options.children);
//     console.log(children);

function onInputChange(e) {
  console.log("change");
  const { name, value } = e.target;
  parameters = { ...parameters, [name]: value };
}

function onSelectChange(e) {
  const { value } = e.target;
  if (value === "mutate") {
    view_mutate_options.hidden = false;
    view_quantity_options.hidden = true;
  }
  if (value === "quantities") {
    view_mutate_options.hidden = true;
    view_quantity_options.hidden = false;
  }
}

function onSelectQuantity(e) {
  const { value } = e.target;
  if (value === "all") {
    parameters.specificQuantity = false;
  } else parameters.specificQuantity = true;
}

const button = document.getElementById("submit");
button.onclick = analise;
