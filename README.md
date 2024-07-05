## React Testing Library (RTL) and Jest

#### Udemy course: React Testing Library and Jest: The Complete Guide

#### Course big project: It is an App where you can search trough public Github repositories, open their code, select a code snipped, press a button 'explain code' and use an AI tool that will explain the code

https://www.udemy.com/share/107RnM3@GLCZoiPcIODQTU3B_NC5OqH1Atz7lYGqNFD8zumiL3ZiTI8AC_muz6BTB68WmxUfVQ==/

1. How to run tests:
   open new terminal => npm test
2. Debug a test and see the DOM output in the terminal =>
   screen.debug(); inside the test
3. Using Playground to help us select DOM elements =>
   screen.logTestingPlaygroundURL();
   This line in the test code generates a link in the terminal

### Test files in this project: HomeRoute.test.js, RepositoriesSummary.test.js, RepositoriesListItem.test.js, AuthButtons.test.js

#### Introducing to three of the hardest aspects of testing: Module mocks, Navigation, 'act'; Examples in RepositoriesListItem.test.js

##### Navigation / Link component in the child components example

When we render a component in a test file we trigger rendering of all of its children. And these children may be connected to some context, they may be provided by an outsite library. Like for example, if we render a component with Link in it, Link is provided by React Router Dom. So we have to accommodate for that.
In case of a Link child component (navigation) we can import in the test file MemoryRouter. Then wrapp our component that we want to render and that has a child component Link, in the MemoryRouter. Then when we want to render our component, we will create a Router context, the Link will be displayed (as a child of our component), it will reach out to the context system and will find the memory router and basicaly be happy :)

##### act() warning

Will occur frequently if you fetch data in useEffect() or any time you have any type of assynchronous code inside of useEffect. When we see these worning normally it means we didn't wait long enough for our states to change.

act() is a function implemented by React Dom. If we are **not using RTL** we must call our functions that lead to state changes (on button click etc.) inside of this act(). Because act creates a time window for us where a state can change, it gives time for all asynchronous operations to run in our fake test environment (simulate click on button => click handler runs => fake data request occurs => state updates => users are visible on the screen => check for users on screen => users are visible).

If we use RTL, it runs act() for us behind the scenes. If we use the asynchronous functions provided by RTL (screen.findBy..., waitFor, user.click, user.keyboard), all this functions will call automatically act() behind the scenes.

When we see these act worning in the terminal, we do not do what our terminal says (you must wrapp your state changes in act()). Instead you use one of RTL's functions.

Options for solving Act warning:

- Use a 'findBy' or 'FindAllBy' to detect when the component has finished its data fetching
- Use an 'act' to control when the data-fetching request gets resolved.
- Use a **module mock** to avoid rendering the trablesome componet. (Skip the trablesom component with assynchronous code when rendering the parent component by creating a mock.)
  jest.mock("../tree/FileIcon", () => {
  return () => {
  return "File Icon Component";
  };
  });
- Use an 'act' with a 'pause'. (as last resort, if nothing else works)
  await act(async () => {
  await pause();
  });

  To debug act() warning, we can write inside of our test func:\
   screen.debug(); await pause(); screen.debug().\
   const pause = () => new Promise((resolve) => setTimeout(resolve, 100));\
  So, we can see how the DOM is changing after waiting and that can give us an idea from where the warning is comming.\
   If after pause we see a link tag, for example, that means that we need to await for a link info to be fetched. So, we can add:\
   await screen.findByRole("link");

#### Handling Data Fetching in Tests / Example in HomeRoute.test.js

We don't want our components to make actual network request (it slows the proces and changes the data). So we fake the fetched data, we create a fake, mock data to use in our tests. There are different approaches to create mock data.

- Mock the data that containes the data fetching code (module mock)
- Use a library to 'mock' axios: get axios to return fake data. Common library is MSW Library. Instead of our request with fetch or axios to go to outside server this msw library will take the request and return mock data. So we can test our code without leaving the test environment.
  If we have a get request to an Api, return json with following data.
  rest.get('api/repositories', (req, res, ctx) => {
  return res(
  ctx.json([
  {
  // list of repositories
  }
  ])
  );
  });

Creating a reusable handlers function, so we can avoid repeating the boilerplate required to set up the MSW. (example in src/test/server.js)

- Create a menual mock for axios

#### Tests regarding authentication / The goal is to better understand how to trableshoot libraries in test / example in src/components/auth/AuthButtons.test.js

AuthButtons => useUser => SWR => Axios => Api

- Scoping test hooks / Test nesting
  In the test files, jest runs first all functions (that are not test), collects all test functions and runs them all together at the end. If we want to change this order we need to do test nesting. We use describe func, where we wrapp the createServer with it's test and so we create a scope where the beforeAll, afterAll functions run.

#### Options for debugging tests:

- to run only one test: instead of describe(...) => use describe.only / or test.only
- set up a debugger => write debugger; in a component or test file.

1. in package.json => in "scripts":{...} after "test":.... add => "test:debug": "test-scripts --inspect-brc test -- ...
2. in a new vs code terminal => npm run test:debug (it will run our test in a special mode, it will stop on the first debugger statemnet it finds )
3. Go to the browser => write the following url: about:inspect => in the browser window we will see or running test process, we can click 'inspect' (link in the window) => and we see what is gooing on inside of our test.

- clasic console.log
