// fs => read, open, write, append, close, update

// 👉 Async: Tum file read karte ho aur saath mein dusra kaam bhi kar sakte ho
// 👉 Sync: Tum file read hone tak wait karte ho

// (1) File Write Methods : Overright karta hai

// 1. Sync (Synchronous) methods

// const fs = require('fs');

// const data = fs.writeFileSync('test.txt', 'This is new File');
// console.log(data);


// const fs = require('fs');

// fs.writeFileSync('test.txt', 'Hello World');        // Hello World

// console.log('File written successfully');
// console.log("Next line");

// 2. Async (Asynchrononus) methods

// const fs = require('fs');

// fs.writeFile('test.txt', 'Hello NodeJS', (err) => {     // Hello NodeJS
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('File written successfully');
// });

// console.log("Next line");


// (2) File Read Methods : Jab tak file read nahi hoti, code aage nahi badhega

// ✅ Async
// const fs = require('fs');

// fs.readFile('test.txt', 'Hello NodeJS', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// ✅ Sync
// const fs = require('fs');

// const data = fs.readFileSync('test.txt', 'Hello NodeJS');
// console.log(data);


// (3) File open Methods : ek file ko open karne ke liye aur uske liye ek file descriptor (fd) return karta hai, jise aage read, write, ya append operations ke liye use karte hain.
// 1. Async fs.open() :
// const fs = require('fs');

// fs.open('test.txt', 'r', (err, fd) => {
//     if(err){
//         console.log('File open karne me error:', err);
//         return;
//     }
//     console.log('File opened successfully, file descriptor:', fd);

//     // File ko close karna zaruri hai
//     fs.close(fd, (err) => {
//         if(err) console.log(err);
//         else console.log('File closed');
//     });
// });

// 'r' → mode (read, write, append)
// 'r' → read only
// 'w' → write (overwrite/create)
// 'a' → append
// Callback (err, fd) → error ya file descriptor return

// fd = ek number hota hai jo OS ko batata hai ke kaunse file ke saath operation ho raha hai
// Har read/write operation is fd ke through hota hai

// 2. Sync fs.openSync() :
// const fs = require('fs');

// try {
//     const fd = fs.openSync('test.txt', 'r');
//     console.log('File opened successfully, file descriptor:', fd);

//     fs.closeSync(fd);  // File ko close karna zaruri
//     console.log('File closed');
// } catch(err) {
//     console.log('Error:', err);
// }

// (4) File append methods : existing file ke end mein data add karne ke liye.

// 1. Async fs.appendFile() :
// const fs = require('fs');

// fs.appendFile('test.txt', '\nThis is new data', (err) => {
//     if(err){
//         console.log('Error:', err);
//         return;
//     }
//     console.log('Data appended successfully');
// });

// 2. Sync fs.appendFileSync() :
// const fs = require('fs');

// try {
//     fs.appendFileSync('test.txt', '\nAppending new line sync');
//     console.log('Data appended successfully');
// } catch(err) {
//     console.log('Error:', err);
// }


// (5) File update Methods : officially nahi hota, lekin hum file ko update karne ke liye existing content ko read karke modify karte hain aur phir write ya append karte hain.
// 1. Async Update Example :

// const fs = require('fs');

// // Step 1: File read karo
// fs.readFile('test.txt', 'utf8', (err, data) => {
//     if(err){
//         console.log('Error reading file:', err);
//         return;
//     }

//     // Step 2: Data modify karo
//     let updatedData = data.replace('Hello', 'Hi');

//     // Step 3: File write karo
//     fs.writeFile('test.txt', updatedData, (err) => {
//         if(err){
//             console.log('Error writing file:', err);
//             return;
//         }
//         console.log('File updated successfully');
//     });
// });

// 2. Sync Update Example :
// const fs = require('fs');

// try {
//     // Read
//     let data = fs.readFileSync('test.txt', 'utf8');

//     // Modify
//     let updatedData = data.replace('Hello', 'Hi');

//     // Write
//     fs.writeFileSync('test.txt', updatedData);

//     console.log('File updated successfully');
// } catch(err) {
//     console.log('Error:', err);
// }


const fs = require('fs');

fs.writeFile('write.txt', 'Hello World', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('File Write');
    }
});

// fs.appendFile('write.txt', '\nThis is new data', (err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Data add kar diya!');
//     }
// });

// fs.readFile('write.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log(data);
//     }
// });

// fs.readFile('write.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err);
//     }

//     let newData = data.replace('Hello', 'Hi');

//     fs.writeFile('write.txt', newData, (err) => {
//         if(err){
//             console.log(err);
//         }else{
//             console.log('File update ho gayi!');
//         }
//     });
// });