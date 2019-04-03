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

const util = require("util");
const isObject = require("lodash.isobject");
const pascalCase = require("pascal-case");
const { removeDuplicateTypes } = require("./remove-duplicate-types");

const schemaToString = (typeName, obj) => {
  let str = "";

  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      const firstElement = obj[key][0];

      if (Array.isArray(firstElement) || isObject(firstElement)) {
        const newTypeName = pascalCase(key);
        str += schemaToString(newTypeName, firstElement);
        obj[key][0] = newTypeName;
      }
      return;
    }

    if (isObject(obj[key])) {
      const newTypeName = pascalCase(key);
      str += schemaToString(newTypeName, obj[key]);
      obj[key] = newTypeName;
    }
  });

  const newObjString = util.inspect(obj, { depth: null, compact: false });

  return `${str}type ${typeName} ${newObjString.replace(/'/g, "")} `
    .replace(/\[\n/g, "[")
    .replace(/\[\s+/g, "[")
    .replace(/\n\s+\]/g, "]")
    .replace(/,/g, "")
    .replace(/ {3,}/g, "  ");
};

module.exports = {
  stringifySchema: (typeName, obj) => removeDuplicateTypes(schemaToString(typeName, obj))
};
