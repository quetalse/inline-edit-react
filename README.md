# inline-edit-react

Simple react inline title editor

![alt text](https://david-dm.org/quetalse/inline-edit-react.svg)

### Features:

- Highlight editable area;
- Enabling editing mode by clicking;
- Saving changes by Enter;
- Success and error handlers;
- Choose of text alignment in the container.

### Props list

Prop | Required | Type | Default | Note 
| --- | --- | --- | --- |--- 
align | No | string | 'center' | CSS justify-content property for .wrapper container: ['left', 'center', 'right']
initTitle | Yes | string | ' ' |  
onEdit | Yes | function |  | Will be called when Enter clicked
onFail | No | function | () => {return true} | Handles an error: (error) => {alert(error)}
onSuccess | No | function | () => {return true} | Handles an success: () => {alert('Success!')}


### Browser Support:

* Firefox - 79+;
* Chrome - 84+;
* Safari - 13.1+;
* IE - 11 (Partial support);
* Edge - 84;

### Demo:

![](inline-edit-react.gif)

### Installing as a package:

`npm i inline-edit-react`

### Usage:

```javascript
    import React, { Component } from 'react';
	import ReactDOM from 'react-dom';
	import InlineEdit from "inline-edit-react";

	const Title = ({title, asyncEditHandler}) => {

		onSuccess = () => {
			alert('ok');
		};

		onFail = (err) => {
			alert(`error: ${err}`);
		}

		onEdit = (newTitle) => {
		    asyncEditHandler(newTitle)
		}

		return (
			<InlineEdit 
				initTitle = {title}
				onEdit = {asyncEditHandler}
				onSuccess = {onSuccess}
				onFail = {onFail}
				align = 'left' // ['left', 'center', 'right']
			</InlineEdit>
		)
	}
```	