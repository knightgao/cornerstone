// 队列

// 异步队列

// 控制并发

export class Queue{
    // 控制并发
    private limitCount
    private runningCount = 0
    private taskList:any = [];
    private  retryCountMap = new Map();
    private  retryLimit:number = 3
    constructor(limitCount:number) {
        this.limitCount = limitCount || 1;
    }
    public push(fn:any){
        return new Promise((resolve,reject)=>{
            this.taskList.push({fn,resolve,reject});
            // 如果当前运行的数量少于并发数,直接执行
            if(this.runningCount < this.limitCount){
                this.handleTask()
            }
        })
    }

    private async  handleTask(){
        // 如果任务队列为空,则直接退出
        if(this.taskList.length === 0) return
        const {fn,resolve,reject} = this.taskList.shift();
        this.runningCount++;
        try {
            resolve(await fn())
        } catch(e){
            if(this.retryCountMap.has(fn)){
                this.retryCountMap.set(fn,this.retryCountMap.get(fn)+1)
            } else {
                this.retryCountMap.set(fn,1)
            }
            if(this.retryCountMap.get(fn) < this.retryLimit){
                this.taskList.push({fn,resolve,reject})
            }else {
                reject(e)
            }
        } finally {
            this.runningCount--;
            this.handleTask()
        }
    }

}