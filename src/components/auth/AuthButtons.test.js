import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";
import { expect } from "playwright/test";

//jest runs first all functions (that are not test), collects all test functions and runs them all together at the end.
// So we can not create two createServer functions that return different values (user: null and user: { id: 1, email: ') In this case we will create two servers that return in teh same time. We want one server runnig for tests where we expect user: null, then closing the server and open onother one for where we expect user: { id: 1, email: '

async function renderComponent() {
  render(
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>
  );

  await screen.findAllByRole("link");
}

//using a discribe function to wrapp the fake server with it's relevant tests. We create one server, that gives us very specific kind of response that we need for our first two test. And after that we create a second server with different specific response that we need for the last two tests.
//createServer => GET '/api/user' =>{ user: null }
describe("when user is not signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up are visible", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();
  });
});

//createServer => GET '/api/user' =>{ user: { id: 1, email: 'testuser@a.com' } }
// describe("when user is signed in", () => {
//   createServer([
//     {
//       path: "/api/user",
//       res: () => {
//         return { user: { id: 1, email: "testuser@a.com" } };
//       },
//     },
//   ]);

//   test("sign in and sign up are not visible", async () => {
//     renderComponent();
//   });

//   test("sign out is visible", async () => {
//     renderComponent();
//   });
// });
