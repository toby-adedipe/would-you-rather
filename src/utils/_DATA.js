let users = {
    toby_adedipe:{
        id: "toby_adedipe",
        name: "Adedipe Oluwatobi",
        answered: {
            "xf0y6z903ryjaeogesdd253nd": "firstOption"
        },
        created: [],
        avatar: "../images/tobs.png"
    },
    joy_bawor:{
        id: "joy_bawor",
        name: "Bawor Joy",
        answered: {
            "9qoj738zxseoifhalx09afby": "firstOption"
        },
        created: [],
        avatar: "../images/joy.png"
    },
    mary_poppins:{
        id: "mary_poppins",
        name: "Mary Poppins",
        answered: {
            "sc73kzqi75rv1e0i6a": "secondOption"
        },
        created: [],
        avatar: "../images/mary.png"
    }
}

let questions = {
    "xf0y6z903ryjaeogesdd253nd":{
        id: "xf0y6z903ryjaeogesdd253nd",
        firstOption: "Eat raw meat",
        secondOption: "Eat raw fish",
        askedBy: "mary_poppins",
        choseFirstOption: ["toby_adedipe"],
        choseSecondOption: []
    },
    "9qoj738zxseoifhalx09afby":{
        id: "9qoj738zxseoifhalx09afby",
        firstOption: "have a golden voice",
        secondOption: "have a silver tongue",
        askedBy: "mary_poppins",
        choseFirstOption: ["joy_bawor"],
        choseSecondOption: []
    },
    "4xapq7mu783mul9t02ghx":{
        id: "4xapq7mu783mul9t02ghx",
        firstOption: "be covered in fur",
        secondOption: "be covered in scales",
        askedBy: "toby_adedipe",
        choseFirstOption: [],
        choseSecondOption: []
    },
    "83mulsjdiwefa9o43kz":{
        id: "83mulsjdiwefa9o43kz",
        firstOption: "always be 10 minutes late",
        secondOption: "alwaybs be 20 minutes early",
        askedBy: "joy_bawor",
        choseFirstOption: [],
        choseSecondOption: []

    },
    "sc73kzqi75rv1e0i6a":{
        id: "sc73kzqi75rv1e0i6a",
        firstOption: "have all traffic lights you approach be green",
        secondOption: "never have to stand in line again",
        askedBy: "toby_adedipe",
        choseFirstOption: [],
        choseSecondOption: ["mary_poppins"]

    },
    "szapa59g577x1oo45cup0d":{
        id: "szapa59g577x1oo45cup0d",
        firstOption: "be able to see 10 minutes into your own future",
        secondOption: "be able to see 10 minutes into the future of anyone but yourself",
        askedBy: "joy_bawor",
        choseFirstOption: [],
        choseSecondOption: []
    }
}

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers (){
    return new Promise((res, rej)=>{
        setTimeout(()=> res({...users}), 600)
    })
}
  
export function _getQuestions (){
    return new Promise((res, rej)=>{
        setTimeout(()=> res({...questions}), 600)
    })
}

function formatQuestion ({ askedBy, firstOption, secondOption }){
    return {
        id: generateUID(),
        firstOption,
        secondOption,
        askedBy,
        choseFirstOption: [],
        choseSecondOption: [],
    }
}

export function _saveQuestion(question){
    return new Promise((res, rej)=>{
        const authedUser = question.askedBy;
        const formattedQuestion = formatQuestion(question);

        setTimeout(()=>{
            questions = {
                ...questions,
                [formattedQuestion.id]: formattedQuestion
            }

            users = {
                ...users,
                [authedUser]:{
                    ...users[authedUser],
                    created: users[authedUser].created.concat([formattedQuestion.id])
                }
            }

            res(formattedQuestion)
        }, 600)
    })
}

export function _saveAnswer ({ authedUser, qid, answer }){
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            users = {
                ...users,
                [authedUser]:{
                    ...users[authedUser],
                    answered: {
                        ...users[authedUser].answered,
                        [qid]: answer
                    }
                }
            }

            questions = {
                ...questions,
                [qid]:{
                    ...questions[qid],
                    [answer]: questions[qid][answer].concat([authedUser])
                }
            }

            res()
        }, 600)
    })
}