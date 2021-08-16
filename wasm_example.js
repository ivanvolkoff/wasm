const fs = require('fs')

async function main() {
    // Load the wasm into a buffer
    const buf = fs.readFileSync('./func.wasm')

    // Make an instance.
    const res = await WebAssembly.instantiate(buf, {})

    // Get function.
    const { memory, sortArraysInt32 } = res.instance.exports
    // Create the arrays.
    const length = 6
    let offset = 0
    const array3 = new Int32Array(memory.buffer, offset, length)
    offset += length * Int32Array.BYTES_PER_ELEMENT
    array3.set([11, 9, 8, 9, 6,2])

    //Input
    console.log("Input array: " + `[${array3.join(", ")}]`);

    //calling function
    sortArraysInt32(
        array3.byteOffset,
        length
    )
// Show the results.
    console.log("Output array: " + `[${array3.join(", ")}]`)
}



main().then(() => console.log('Congrats, you sorted an array using .wasm!'))