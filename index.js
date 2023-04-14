#!/usr/bin/env node

const fs = require('fs');
const util = require('util');




//Method 1 to implement use Array to store callbacks using thrie index so we can run them in their sequence

// fs.readdir(process.cwd(), (err, filenames) => {

//     if (err) {
//         console.log(err);
//     }

//     const allStats = Array(filenames.length).fill(null);

//     for(let filename of filenames){
//         const index = filenames.indexOf(filename);

//         fs.lstat(filename,(err,stats) => {
//             if(err){
//                 console.log(err);
//             }

//             allStats[index] = stats;

//             const ready = allStats.every(stats => {
//                 return stats;
//             })

//             if(ready)
//             {
//                 allStats.forEach((stats,index) => {
//                     console.log(filenames [index], stats.isFile());
//                 });
//             }
//         });
//     }
// });



//methods2

//const lstat = util.promisify(fs.lstat);


//method 3
// const {lstat} = fs.promises; 

// fs.readdir(process.cwd(),async (err,filenames)=> {

//     if(err){
//         console.log(err);
//     }

//     for(let filename of filenames){
//         try{
//             const stats = await lstat(filename);
//             console.log(filename,stats.isFile());
//         }
//         catch(err){
//             console.log(err);   
//         }
        
//     }
// })

//but with async and wait we are running in sequence so to run parallel new implementation below


const {lstat} = fs.promises; 

fs.readdir(process.cwd(),async (err,filenames)=> {

    if(err){
        console.log(err);
    }

    const statPromises =  filenames.map(filename => {
        return lstat(filename);
    });

    const allstats = await Promise.all(statPromises);

    for(let stat of allstats){
        const index = allstats.indexOf(stat);

        console.log(filenames[index],stat.isFile());
    }
});