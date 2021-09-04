import React from "react";
import { create } from "react-test-renderer";
import { Paginator } from "./Paginator";

// describing multiple texts
describe("Paginator component tests", () => {
  test("Proper number of spans should be rendered", () => {
    // create() - imported from "react-test-renderer" - "creates" component to be tested without rendering it in browser for testing reasons
    const component = create(
      <Paginator
        pageSize={1}
        totalItemsCount={11}
        currentPage={1}
        onPageChange={() => {}}
        portionSize={10}
      />
    );
    const root = component.root;
    const spans = root.findAllByType("span");
    expect(spans.length).toBe(10);
  });

  test("Next portion button should be shown if pages count is > 10", () => {
    const component = create(
      <Paginator
        pageSize={1}
        totalItemsCount={11}
        currentPage={1}
        onPageChange={() => {}}
        portionSize={10}
      />
    );
    const root = component.root;
    const buttons = root.findAllByType("button");
    expect(buttons.length).toBe(1);
  });
});
