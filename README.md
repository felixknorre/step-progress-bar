# step-progress-bar

![step progress bar demo](demo/demobar.png)

A step progress bar to vizualize the progress of a online from.



## Installation

Use [npm](https://www.npmjs.com) to install step-progress-bar.

```bash
npm install
```

## Usage
Name the id of the container div "step-progress-bar".
The bar adapts to the container div.

```js
// -- demo input --
let input = {
    steps: [
        {

            text: "1",
            status: "visited", // ["visited", "selected", "silent"]
        },
        {

            text: "2",
            status:  "visited", // ["visited", "selected", "silent"]
        },
        {
            text: "3",
            status: "selected", // ["visited", "selected", "silent"]
        },
        {
            text: "4",
            status: "silent", // ["visited", "selected", "silent"]
        }
    ]
}

// -- draw bar for the first time --
drawStepProgressBar(input);
```

## Author
* Felix Knorre <felix-knorre@hotmail.de>

## License
[MIT](https://choosealicense.com/licenses/mit/)
