**ReactJS**

**1. Component**

 Component in React is representation a part of UI. In React have 5 Component, Header, SideNav, Main Content, and footer. Component is reusable, the same Component can have different properties.
 
 Component have 2 Types :
 
 - Stateless Functional Component is a javascript function and return a html code.
 - Stateful Class Component is a class extending Component class and render method to retrun HTML code
 
**2. JSX**

 JSX is a Extension to the javascript language syntax, with react library JSX write like code for elements and Components. Jsx tags have a tag name, attributes, and children. Jsx is not a necessary to write React applications, but Jsx makes yout react code simpler and elegant.
 
 difference of javascript => JSX :
 - Class => className
 - for => htmlFor
 - un JSX use camelCase for propperty naming convention.
 
**3. Props**

 props in react is same context with parameter in function javascript, but in react we can only use parameter props, and we can use properties in Component tags. the value of props can't update or change because it is a read only property in Component.
 
 - props is get passed to the commpont
 - the value from function parameter
 - props are immutable
 - in functional Components we use props
 - in class commponts we use this.props
 
**4. State**
 
 state is managed within the Component, variables declared in the function body. not like props, state it can be changed.
 
 - in functional commponts we use useState Hook
 - in Class Components we use this.state
 
**5. Event Handling**
 
 context is same with event handler in javascript, example like onclick event in button, but in react we can add event handler in function or class file. we can create function for onclick in scope function or class.
 
 - in functional commponts we use {nameFunction} in event handler
 - in Class Components we use {this.nameFunction} in event handler
 
**6. Conditional Rendering**
 
 Conditional rendering in react same with in javascript, like if-else, elements variables, ternary Conditional operator and short circuit operator.
 
**7. Lists and Keys**

  Array in react use property and value inside the array, like [{id: value, age: value}{id: value, age: value}]. for show the value we can create variable for save mapping value for that array and call that in parameter function.
 
 Keys is use for add unique for value in Array. we can use property key to set where value is unique, and keys is not acceptable to children Component.
 
 When list have some value and order in list but difference in length value, the list is nothing change.
 When list have a few some value, but difference order and length value, the list only use the some value at the list.
 
 when lists with keys, have some value, but difference order and length value, Any values not found in the shorter list will be added to that list along with their keys.
 
