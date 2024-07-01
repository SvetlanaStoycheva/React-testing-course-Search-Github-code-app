import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

const repository = {
  full_name: "octocat/hello-world",
  language: "JavaScript",
  description: "A repository for the GitHub API",
  owner: "octocat",
  name: "hello-world",
  html_url: "https://github.com/octocat/hello-world",
};

function renderComponent() {
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

test("shows a link to the github repository", () => {
  renderComponent();
});
