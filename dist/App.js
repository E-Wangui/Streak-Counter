"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Habits {
    static addHabit() {
        return __awaiter(this, void 0, void 0, function* () {
            let habit = document.querySelector("#habit-name");
            let date = document.querySelector("#habit-date");
            let newHabit = {
                name: habit.value,
                date: date.value
            };
            yield fetch("http://localhost:3000/habits", {
                method: "POST",
                body: JSON.stringify(newHabit),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        });
    }
    static getHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("http://localhost:3000/habits");
            let habits = response.json();
            return habits;
        });
    }
    static renderHabits() {
        return __awaiter(this, void 0, void 0, function* () {
            let habits = yield this.getHabits();
            let habit = document.querySelector(".habits");
            let oneDay = 1000 * 60 * 60 * 24;
            habits.forEach(h => {
                let card = document.createElement("div");
                card.className = "habit";
                let streak = Math.ceil((new Date().getTime() - new Date(h.date).getTime()) / oneDay);
                let html = `
    <h3>${h.name}</h3>
    <p>${streak} Days</p>
            `;
                card.innerHTML = html;
                habit.appendChild(card);
                console.log(card);
            });
        });
    }
}
Habits.renderHabits();
const btn = document.querySelector("button");
btn.addEventListener("click", Habits.addHabit);
