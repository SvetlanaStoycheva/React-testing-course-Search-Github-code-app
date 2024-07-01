import { screen, render } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("displays the primary language of the repository", () => {
  const repository = {
    stargazers_count: 5,
    open_issues: 10,
    forks: 20,
    language: "JavaScript",
  };
  render(<RepositoriesSummary repository={repository} />);

  //loop through the repository object and check if the values are displayed
  for (const [key, value] of Object.entries(repository)) {
    const element = screen.getByText(new RegExp(value)); //looks for the value but the value can have other text around it. This is more loose matching.
    expect(element).toBeInTheDocument();
  }

  //   const language = screen.getByText("JavaScript");
  //   const stars = screen.getByText("100");
  //   const issues = screen.getByText("10 issues need help");
  //   const forks = screen.getByText("20 Forks");

  //   expect(stars).toBeInTheDocument();
  //   expect(issues).toBeInTheDocument();
  //   expect(forks).toBeInTheDocument();
});
