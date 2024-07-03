import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import { createServer } from "../test/server";

//Steps tof testing fetching data:
// Create a test file
// Understand the exact URL, method and return value of requests that component will make
// Create MSW handler to intercept that request and return some fake data for your component to use
// Set up the beforeAl, afterEach, and afterAll hooks in your last file
// In a test, render the component. Wait for an element to be visible.

// Summary: Any time we are testing a component that does data fetching, we have to truely analize what data our component expects, and we need to return some data of the very similar stracture. And we need to shape this data like something that we can actualy test.

createServer([
  {
    path: "/api/repositories",
    method: "get",
    res: (req, res, ctx) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      return {
        items: [
          { id: 1, full_name: `${language}_full_name1` },
          { id: 2, full_name: `${language}_full_name2` },
        ],
      };
    },
  },
]);

//we take the "/api/repositories" from Network => request URL: http://localhost:3000/api/repositories?q=stars:%3E10000+language:javascript&per_page=10
// const handlers = [
//   rest.get("/api/repositories", (req, res, ctx) => {
//     const language = req.url.searchParams.get("q").split("language:")[1];

//     //our respons from the network is an object and we need only the item property and inside of it we need only the id and full_name (those are the only things we use in HomeRoute => RepositoriesTable component)
//     return res(
//       ctx.json({
//         items: [
//           { id: 1, full_name: `${language}_full_name1` },
//           { id: 2, full_name: `${language}_full_name2` },
//         ],
//       })
//     );
//   }),
// ];

// const server = setupServer(...handlers);

//these functions are given by jest. Inside of them we can pass our functions that will be executed automatically; before all tests, after each test, after all tests;
// beforeAll(() => server.listen());

// afterEach(() => server.resetHandlers());

// afterAll(() => server.close());

test("renders two links for each language (two because we have two items in the mock data)", async () => {
  render(
    // MemoryRouter is used to wrap the component that uses the Link component from react-router-dom. We need to wait for our fake request to msw to be resolved.
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  //to see how our DOM looks after the fake data is fetched
  //   await pause();
  //   screen.debug();

  //Loop over each language
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];
  //For each language, make sure we see two links
  for (let language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`, "i"),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_full_name1`);
    expect(links[1]).toHaveTextContent(`${language}_full_name2`);
    expect(links[0]).toHaveAttribute(
      "href",
      `/repositories/${language}_full_name1`
    );
    expect(links[1]).toHaveAttribute(
      "href",
      `/repositories/${language}_full_name2`
    );
  }
  //Assert that the links have the appropriate full_name
});

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));
