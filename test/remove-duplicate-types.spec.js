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

const { removeDuplicateTypes } = require("../lib/remove-duplicate-types");

describe("Remove duplicate types tests", () => {
  it("Removes duplicate types, keeping the type with more fields", () => {
    const input =
      "type Type0 { field0: Int field1: Int } type Type0 { field0: Int field1: Int field2: Int }";
    const result = removeDuplicateTypes(input);
    expect(result).toBeTruthy();
    expect(result).toEqual(
      "type Type0 { field0: Int field1: Int field2: Int }"
    );
  });

  it("Indicates probable duplicate fields", () => {
    const input =
      "type Type0 { field0: Int field1: Int } type Type1 { field0: Int field1: Int }";
    const result = removeDuplicateTypes(input);
    expect(result).toBeTruthy();
    expect(result).toEqual(`type Type0 { field0: Int field1: Int }

type Type1 { field0: Int field1: Int }

# Types with identical fields:
# Type0 Type1`);
  });
});
