import { Queue } from "./Queue"
// 示例用法
const queue = new Queue(1); // 设置并发处理数为2

const result = [() => 1111, () => 2222, () => 3333, () => {
    console.log("6666")
    return Promise.resolve("4444")
}, () => {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                console.log("5555")
                resolve("5555")
            }, 2000);
        }
    )
}, () => 666, () => 7777].map(
    async (task) => {
        return await queue.push(() => task()).then(
            (value) => {
                console.log("result", value)
                return value
            }
        )
    }
)

console.log(result)

// Promise.all(result).then(
//     (val) => {
//         console.log("val", val)
//     }
// )