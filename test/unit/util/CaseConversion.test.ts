import {
  toCamelCase,
  toSnakeCase,
  toKebabCase,
} from "../../../src/util/CaseConversion";

describe("CaseConversion", (): void => {
  it("converts text to camel case.", async (): Promise<void> => {
    expect(toCamelCase("Hello World")).toEqual("helloWorld");
  });

  it("converts text to snake case.", async (): Promise<void> => {
    const record = { abc: "def" };
    expect(toSnakeCase("Hello World")).toEqual("hello_world");
  });

  it("converts text to kebab case.", async (): Promise<void> => {
    const record = { abc: "def" };
    expect(toKebabCase("Hello World")).toEqual("hello-world");
  });
});
