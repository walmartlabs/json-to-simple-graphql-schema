/**
 * Copyright (c) [2018]-present, Walmart Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License."
 */

"use strict";

const simpleInput = require("./fixtures/simple");
const simpleInputWithDuplicates = require("./fixtures/simple-with-duplicates");
const { jsonToSchema } = require("../lib");

describe("Simple input tests", () => {
  it("Parses simple input", () => {
    const result = jsonToSchema({
      baseType: "Test",
      jsonInput: JSON.stringify(simpleInput),
    });
    expect(result.value).toBeTruthy();
    expect(result.value).toEqual(`type SubType {
  id: String
  name: String
}

type Test {
  id: String
  name: String
  subType: SubType
}`);
  });

  it("Parses simple input with prefix", () => {
    const result = jsonToSchema({
      baseType: "Test",
      prefix: "Prefix",
      jsonInput: JSON.stringify(simpleInput),
    });
    expect(result.value).toBeTruthy();
    expect(result.value).toEqual(`type PrefixSubType {
  id: String
  name: String
}

type Test {
  id: String
  name: String
  subType: PrefixSubType
}`);
  });

  it("Parses simple input removing duplicates", () => {
    const result = jsonToSchema({
      baseType: "Test",
      jsonInput: JSON.stringify(simpleInputWithDuplicates),
    });
    expect(result.value).toBeTruthy();
    expect(result.value).toEqual(`type Color {
  id: String
  name: String
  hex: String
}

type SubType {
  id: String
  name: String
  color: Color
}

type Test {
  id: String
  name: String
  subType: SubType
  color: Color
}`);
  });
});
