// Computing character frequency histograms with JavaScript

// This class extends Map so that the get() method returns the specified
// value instead of null when the key is not in the map
class DefaultMap extends Map {
    constructor(defaultValue) {
        super(); // Invoke superclass constructor
        this.defaultValue = defaultValue; // Remember the default value
    }
    get(key) {
        if (this.has(key))  // If the key is already in the map
            return super.get(key); // return its value from superclass.
        else
            return this.defaultValue; // Otherwise return the default value
    }
};
// This class computes and displays letter frequency histograms
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);  // Map from letters to counts
        this.totalLetters = 0;                  // How many letters in all
    }
    // This function updates the histogram with the letters of text.
    add(text) {
        // Remove whitespace from the text, and convert to upper case
        text = text.replace(/\s/g, "").toUpperCase();
        // Now loop through the characters of the text
        for (let character of text) {
            let count = this.letterCounts.get(character); //Get old count
            this.letterCounts.set(character, count + 1); // Increment it
            this.totalLetters++;
        }
    }
    //Convert the histogram to a string that display an ASCII graphic
    toString() {
        // Convert the Map to an array of [key,value] arrays
        let entries = [...this.letterCounts];
        // Sort the array by count, then alphabetically
        entries.sort((a, b) => {                  // A function to define sort order.
            if (a[1] === b[1]) {                  // If the counts are the same
                return a[0] < b[0] ? -1 : 1;      // Sort alphabetically
            } else {                              // If the countsdiffer
                return b[1] - a[1];               // Soft by largest count
            }
        });
        // Convert the counts to percentages
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100
        }
        // Drop any entries less than 1%
        entries = entries.filter(entry => entry[1] >= 1);
        // Now convert each entry to a line of text
        let lines = entries.map(
            ([l, n]) => `${l}: ${"#".repeat(Math.round(n))}${n.toFixed(2)}%`
        );
        return lines.join("\n");
    }
}
async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8");
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}
// This one final line of code is the main body of the program.
// It makes a Histogram object from standard input, then prints the histogram.
histogramFromStdin().then(
    histogram => { 
        console.log(histogram.toString()); 
    }
);