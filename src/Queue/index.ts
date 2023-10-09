import { Queue } from "./Queue"
// 示例用法
const queue = new Queue(2); // 设置并发处理数为2

const result = [1111, 2222, 3333, () => {
    return Promise.resolve("4444")
}, () => {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve("5555")
            }, 2000);
        }
    )
}, 666, 7777].map(
    (task) => {
        return queue.push(() => task)
    }
)


console.log(result)