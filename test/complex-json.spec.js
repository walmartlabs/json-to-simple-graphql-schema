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

const complexInput = require("./fixtures/complex");
const { jsonToSchema } = require("../lib");

describe("Complex input tests", () => {
  it("Parses complex input", () => {
    const result = jsonToSchema({
      baseType: "Test",
      jsonInput: JSON.stringify(complexInput),
    });
    expect(result.value).toBeTruthy();
    expect(result.value).toEqual(`type Extras {
  key: String
  value: String
}

type Groups {
  display_name: String
  description: String
  image_display_url: String
  title: String
  id: String
  name: String
}

type Tags {
  vocabulary_id: String
  state: String
  display_name: String
  id: String
  name: String
}

type Resources {
  mimetype: String
  cache_url: String
  hash: String
  description: String
  name: String
  format: String
  url: String
  datastore_active: Boolean
  cache_last_updated: String
  package_id: String
  created: String
  state: String
  mimetype_inner: String
  last_modified: String
  position: Int
  revision_id: String
  url_type: String
  id: String
  resource_type: String
  size: String
}

type Result {
  license_title: String
  maintainer: String
  private: Boolean
  maintainer_email: String
  num_tags: Int
  id: String
  metadata_created: String
  metadata_modified: String
  author: String
  author_email: String
  state: String
  version: String
  creator_user_id: String
  type: String
  num_resources: Int
  license_id: String
  organization: String
  name: String
  isopen: Boolean
  url: String
  notes: String
  owner_org: String
  license_url: String
  title: String
  revision_id: String
  extras: [Extras]
  relationships_as_subject: [String]
  groups: [Groups]
  tags: [Tags]
  resources: [Resources]
  relationships_as_object: [String]
}

type Test {
  help: String
  success: Boolean
  result: Result
}`);
  });
});
