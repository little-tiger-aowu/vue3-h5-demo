import {defineStore} from 'pinia';

export const userMain = defineStore('main', {
    state: () => {
        return {
            sum: 0,
            userName: 'admin'
        }
    },
    getters: {
        doubleSum: (state) => {
            return state.sum * 2
        }
    },
    actions: {
        changName (value: string)  {
            this.userName = value
        },
        randomizeSum () {
            setTimeout(() => {
                this.sum = Math.round(100 * Math.random())
            })
        }
    }
})
