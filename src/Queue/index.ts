import { Queue } from "./Queue"
// 示例用法
const queue = new Queue(5); // 设置并发处理数为2

const arr = [1,2,3,4,5,6,7,8,9,10];

const uploadFile =(id:number)=>{
    return  new Promise(
        (resolve,reject)=>{
            setTimeout(
                ()=>{
                    console.log(`我是id:::${id}`)
                     5  > Math.floor(Math.random() * 9) + 1 ? reject(id):  resolve(id)
                },1_000
            )
        }
    )
}



Promise.all(arr.map((i)=>queue.push(()=>uploadFile(i)))).then(
    ()=>{
        console.log('complete')
    }
).catch(
    ()=>{
        console.log("eeee")
    }
)

// for (let i = 0; i < arr.length; i++) {
//     queue.push(uploadFile(arr[i]))
// }



// const result = [() => 1111, () => 2222, () => 3333, () => {
//     console.log("6666")
//     return Promise.resolve("4444")
// }, () => {
//     return new Promise(
//         (resolve, reject) => {
//             setTimeout(() => {
//                 console.log("5555")
//                 resolve("5555")
//             }, 2000);
//         }
//     )
// }, () => 666, () => 7777].map(
//     async (task) => {
//         return await queue.push(() => task()).then(
//             (value) => {
//                 console.log("result", value)
//                 return value
//             }
//         )
//     }
// )
//
// console.log(result)

// Promise.all(result).then(
//     (val) => {
//         console.log("val", val)
//     }
// )