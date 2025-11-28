import { alphabetizeCounts } from "../src/utils";

const SAMPLE = ["a", "a", "a", "a", "b", "b", "b", "c", "d"];
const MIN_COUNT = 2;

const [labels, counts] = alphabetizeCounts(SAMPLE, MIN_COUNT, "label");

console.log("Input:", SAMPLE);
console.log("Labels >", MIN_COUNT, ":", labels);
console.log("Counts >", MIN_COUNT, ":", counts);
