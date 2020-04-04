# step-progress-bar

![step progress bar demo](demo/demopic.png)

A step progress bar to vizualize the progress of a  online From.



## Installation

Use [yarn](https://yarnpkg.com) to install step-progress-bar.

```bash
yarn install
```

## Usage

```js
//input data
let input = {
    steps: [
        {

            text: "1",
            status: "selected", // ["visited", "selected", "silent"]
        },
        {

            text: "2",
            status:  "silent", // ["visited", "selected", "silent"]
        },
        {
            text: "3",
            status: "silent", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
        }
    ]
};
//set progress
setCurrentStep(input);
```

## Author
* Felix Knorre <felix-knorre@hotmail.de>

## License
[MIT](https://choosealicense.com/licenses/mit/)
