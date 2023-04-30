interface Habit {
    name:string
    date:string
    id:number
}
class Habits{
static async addHabit(){
    let habit=document.querySelector("#habit-name") as HTMLInputElement
    let date=document.querySelector("#habit-date") as HTMLInputElement
    let newHabit={
        name: habit.value, 
        date: date.value
    }
    await fetch("http://localhost:3000/habits", {
        method:"POST",
        body: JSON.stringify(newHabit),
        headers:{
            "Content-Type":"application/json"
        }
    })
}
    static async getHabits():Promise<Habit[]>{
        let response=await fetch("http://localhost:3000/habits")
        let habits = response.json()
        return habits
    }
    static async renderHabits(){
        let habits=await this.getHabits()
        let habit=document.querySelector(".habits")!
        let oneDay=1000*60*60*24
        habits.forEach(h=>{
            let card=document.createElement("div")
            card.className="habit"
            let streak=Math.ceil((new Date().getTime()-new Date(h.date).getTime())/oneDay)
            let html=`
    <h3>${h.name}</h3>
    <p>${streak} Days</p>
            `
            card.innerHTML =html
            habit.appendChild(card)
            console.log(card)
        })

    }

}
Habits.renderHabits()
const btn=document.querySelector("button")!
btn.addEventListener("click", Habits.addHabit)
