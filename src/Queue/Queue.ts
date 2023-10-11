class Queue {
    // 并发处理数
    private concurrent = 1;
    // 任务队列
    private queue: any = [];
    // 正在运行的任务
    private running = 0;

    constructor(concurrent = 1) {
        this.concurrent = concurrent;
    }

    async push(task: Function) {
        return new Promise((resolve, reject) => {
            // 将操作推入队列中
            this.queue.push({ task, resolve, reject })

            if (this.running < this.concurrent) {
                this.process();
            }
        })

    }

    async process() {
        // 如果队列为空直接退出
        if (this.queue.length === 0) {
            return
        }
        // 取出第一个任务
        const { task, resolve, reject } = this.queue.shift() as any;
        // 正在运行的数量++
        this.running++;
        try {
            let reuslt;
            if (typeof task === 'function') {
                reuslt = await task()
            } else {
                reuslt = await task
            }
            resolve(reuslt)
        } catch (err) {
            reject(err)
        } finally {
            // 不论成功还是报错，任务结束正在运行的数量--
            this.running--;
            // 继续处理下一个任务
            this.process()
        }

    }


}

export { Queue }