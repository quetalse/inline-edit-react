# inline-edit-react

Simple react inline title editor

### Features:

- Highlight editable area;
- Enabling editing mode by clicking;
- Saving changes by Enter;
- Success and error handlers.

### Important links:

### Demo:

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

		return (
			<InlineEdit 
				initialTitle = {title}
				onEdit = {asyncEditHandler}
				onSuccess = {onSuccess}
				onFail = {onFail}
			</InlineEdit>
		)
	}
```	