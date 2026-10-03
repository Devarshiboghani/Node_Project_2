// const http = require('http')         // http module import karna

// const requestObj = (request, response) => {          // req => client ki request (URL, method, etc.)
//     response.write('Welcome to NodeJS Custom Server');       // res => response bhejne ke liye
//     response.end();          // complusury end karna padta hai
// }

// const server = http.createServer(requestObj)        // creating a new server       // server → actual server hai jo run karega

// server.listen(8000);     // 8000 => port number hai      // listen = "intezaar karna (wait karna)"


// const http = require('http');   

// const requestObj = (req, res) => {
//     if(req.url == "/"){
//         res.end('Welcome to Home Page');
//     }else if(req.url == "/about"){
//         res.end("About Page");
//     }else if(req.url == "/product"){
//         res.end("Product Page");
//     }else{
//         res.end("Page Not Found");
//     }
// }

// const server = http.createServer(requestObj)

// server.listen(8000, (err) => {
//     if(err){
//         console.log(err);
//         return;     // return se function yahin ruk jayega
//     }
//     console.log(`Server start at http://localhost:8000`);
// });


const http = require('http');   
const fs = require('fs');

const requestObj = (req, res) => {
   let filepath = "";
   if(req.url == "/"){
    filepath = "./index.html";
   }else if(req.url == "/about"){
    filepath = "./about.html";
   }else if(req.url == "/product"){
    filepath = "./product.html";
   }else{
    filepath = "./notfound.html";
   }
   let data = fs.readFileSync(filepath, 'utf-8');
   res.end(data);
}

const server = http.createServer(requestObj)

server.listen(8000, (err) => {
    if(err){
        console.log(err);
        return;    
    }
    console.log(`Server start at http://localhost:8000`);
});
