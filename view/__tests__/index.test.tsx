import { shallow } from "enzyme";
import React from "react";

import App from "../pages/index";

describe("With Enzyme", () => {
  test('p tag\' text is \"Hello Next.js !\"', () => {
    const app = shallow(<App />);
    expect(app.find("p").text()).toMatch("Hello Next.js !");
  });
});