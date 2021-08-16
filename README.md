# Passing array to .wasm, compiled from C. 
These examples have been tested with [node v14.17.4](https://nodejs.org/en/), [clang version 12.0.1](https://clang.llvm.org/) on Mac BigSur 11.5.1

1. Download the repo:

`https://github.com/vanolincikus/wasm`

2.Open terminal on root folder.

3. Build the wasm module.

Now lets compile.

```clang sort.c \
  --target=wasm32-unknown-unknown-wasm \
  --optimize=3 \
  -nostdlib \
  -Wl,--export-all \
  -Wl,--no-entry \
  -Wl,--allow-undefined \
  --output func.wasm 
```
  So many flags! Lets go through them:



`--target=wasm32-unknown-unknown-wasm` tells the compiler/linker to produce wasm.

`--optimize=3` seems to ne necessary to produce valid wasm. 

`-nostdlib ` tells the compiler/linker that we don’t have a standard library, which is very sad.

`-Wl,--export-all` tells the linker to export anything it can.

`-Wl,--no-entry` tells the linker that there’s no main; this is just a library.

`-Wl,--allow-undefined` tells the linked to allow the code to access functions and variables that have not been defined. 
We’ll need to provide them when we instantiate the WebAssembly instance. This won’t be used in this example, but we’ll need it later.

`--output func.wasm` does what it says on the tin.

If all went well you now have an func.wasm file.

4.Lets run it.

`node wasm_example.js`

If all went well you should see the following.

```
Input array: [11, 9, 8, 9, 6, 2]
Output array: [2, 6, 8, 9, 9, 11]
Congrats, you sorted an array using .wasm!
```


