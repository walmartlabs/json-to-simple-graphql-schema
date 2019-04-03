#! /usr/bin/env node
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

const fs = require("fs");
const { jsonToSchema } = require("./lib");

const main = () => {
  const jsonInput = fs.readFileSync(0, "utf8");

  const { error, value } = jsonToSchema({ jsonInput });
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }

  // eslint-disable-next-line no-console
  console.log(value);
};

if (!module.parent) {
  main();
}

module.exports = { jsonToSchema };
