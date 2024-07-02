import { screen, render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";
import { expect } from "playwright/test";

// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

const pause = () => new Promise((resolve) => setTimeout(resolve, 100));

function renderComponent() {
  const repository = {
    full_name: "octocat/hello-world",
    language: "JavaScript",
    description: "A repository for the GitHub API",
    owner: { login: "octocat" },
    name: "hello-world",
    html_url: "https://github.com/octocat/hello-world",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github repository", async () => {
  const { repository } = renderComponent();

  //to avoid act worning regardng the FILEIcon which gets its aria-label= assynchronously
  //using an assynchronous findBy
  await screen.findByRole("img");

  //using a mock (line 5)

  //using an act with pouse
  // await act(async () => {
  //   await pause();
  // });

  //code for testing adding a new link
  const link = screen.getByRole("link", { name: /github repository/i });
  // screen.logTestingPlaygroundURL();
  // expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a fileicon with the appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "JavaScript" });

  // expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img"), { name: "JavaScript" };

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  // expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
