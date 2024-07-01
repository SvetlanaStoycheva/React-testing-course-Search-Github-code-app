## React Testing Library and Jest

#### Udemy course: React Testing Library and Jest: The Complete Guide

#### Course big project: It is an App where you can search trough public Github repositories, open their code, select a code snipped, press a button 'explain code' and use an AI tool that will explain the code

https://www.udemy.com/share/107RnM3@GLCZoiPcIODQTU3B_NC5OqH1Atz7lYGqNFD8zumiL3ZiTI8AC_muz6BTB68WmxUfVQ==/

1. How to run tests:
   open new terminal => npm test

### Theory

#### Introducing to three of the hardest aspects of testing: Module mocks, Navigation, 'act'

###### Navigation / Link component in the child components example

When we render a component in a test file we trigger rendering of all of its children. And this children may be connected to some context, they may be provided by an outsite library. Like for example, if we render a component with Link in it, <Link/> is provided by React Router Dom. So we have to accommodate for that.
In case of a Link child component (navigation) we can import in the test file a MemoryRouter. Then wrapp our component that we want to render and that has a child component Link, in a <MemoryRouter>. Then when we want to render our component, we will create a Router context, the Link will be displayed (as a child of our component), it will reach out to the context system and will find the memory router and basicaly be happy :)
