// ==UserScript==
// @name         Online Tribute Solver
// @version      0.1
// @description  onlinetribute.info test solver.
// @match        http://onlinetribune.info/*
// @icon         https://icons.duckduckgo.com/ip2/onlinetribune.info.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (!window.wpProQuizInitList) {
        return
    }

    // Check right answers
    document.querySelectorAll('.wpProQuiz_questionList').forEach((question) => {
        const ans = window.wpProQuizInitList[0].init.json[+question.dataset.question_id].correct.indexOf(1)
        question.querySelector(`.wpProQuiz_questionListItem[data-pos="${ans}"] input`).checked = true
    })

    // Calculate quiz duration
    const questionCount = window.wpProQuizInitList[0].init.globalPoints
    const offset = (Math.random() + 1) * questionCount * 20 * 1000 // 20-30 seconds per question

    // Patch Date so that it lags behind
    const oldDate = window.Date
    window.Date = function() {
        return new oldDate(new oldDate().getTime() - offset)
    }
    window.Date.prototype = oldDate.prototype
    window.Date.now = function() {
        return new window.Date().valueOf()
    }

    // Submit answers
    const start = document.querySelector('[name=startQuiz]')
    const check = document.querySelector('[name=check]')
    const next = document.querySelector('[name=next]')

    start.click()
    for (let i = 0; i < window.wpProQuizInitList[0].init.globalPoints - 1; i++) {
        check.click()
        next.click()
    }

    // Restore original Date
    window.Date = oldDate

    // Submit last answer
    check.click()
    next.click()
})();
