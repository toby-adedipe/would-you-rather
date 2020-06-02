let users = {
    toby_adedipe:{
        id: "toby_adedipe",
        name: "Adedipe Oluwatobi",
        answered: {
            "xf0y6z903ryjaeogesdd253nd": "firstOption"
        },
        created: ["sc73kzqi75rv1e0i6a", "4xapq7mu783mul9t02ghx"],
        avatar: "/images/tobs.png"
    },
    joy_bawor:{
        id: "joy_bawor",
        name: "Bawor Joy",
        answered: {
            "9qoj738zxseoifhalx09afby": "firstOption"
        },
        created: ["szapa59g577x1oo45cup0d", "sc73kzqi75rv1e0i6a"],
        avatar: "/images/joy.png"
    },
    mary_poppins:{
        id: "mary_poppins",
        name: "Mary Poppins",
        answered: {
            "sc73kzqi75rv1e0i6a": "secondOption"
        },
        created: ["9qoj738zxseoifhalx09afby", "xf0y6z903ryjaeogesdd253nd"],
        avatar: "/images/mary.png"
    }
}

let questions = {
    "xf0y6z903ryjaeogesdd253nd":{
        id: "xf0y6z903ryjaeogesdd253nd",
        firstOption: {
            text : "Eat raw meat",
            votes : ["toby_adedipe"]
        },
        secondOption: {
            text : "Eat raw fish",
            votes : []
        },
        askedBy: "mary_poppins",
        timestamp: 1201043995650,
    },
    "9qoj738zxseoifhalx09afby":{
        id: "9qoj738zxseoifhalx09afby",
        firstOption: {
            text : "have a golden voice",
            votes : ["joy_bawor"]
        },
        secondOption: {
            text : "have a silver tongue",
            votes :  []
        },
        askedBy: "mary_poppins",
        timestamp: 1202043995650,
    },
    "4xapq7mu783mul9t02ghx":{
        id: "4xapq7mu783mul9t02ghx",
        firstOption: {
            text : "be covered in fur",
            votes : []
        },
        secondOption: {
            text : "be covered in scales",
            votes : []
        },
        askedBy: "toby_adedipe",
        timestamp: 1203043995650,
    },
    "83mulsjdiwefa9o43kz":{
        id: "83mulsjdiwefa9o43kz",
        firstOption: {
            text : "always be 10 minutes late",
            votes : []
        },
        secondOption: {
            text : "alwaybs be 20 minutes early",
            votes : []
        },
        askedBy: "joy_bawor",
        timestamp: 1204043995650,

    },
    "sc73kzqi75rv1e0i6a":{
        id: "sc73kzqi75rv1e0i6a",
        firstOption: {
            text : "have all traffic lights you approach be green",
            votes : []
        },
        secondOption: {
            text : "never have to stand in line again",
            votes : ['mary_poppins']
        },
        askedBy: "toby_adedipe",
        timestamp: 1205043995650,
    },
    "szapa59g577x1oo45cup0d":{
        id: "szapa59g577x1oo45cup0d",
        firstOption: {
            text: "be able to see 10 minutes into your own future",
            votes: []
        },
        secondOption: {
            text : "be able to see 10 minutes into the future of anyone but yourself",
            votes : []
        },
        askedBy: "joy_bawor",
        timestamp: 1206043995650,
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

function formatQuestion ({ askedBy, firstOptionText, secondOptionText }){
    return {
        id: generateUID(),
        timestamp: Date.now(),
        askedBy,
        firstOption:{
            text : firstOptionText,
            votes : []
        },
        secondOption:{
            text : secondOptionText,
            votes : []
        }
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

export function _saveAnswer ({ authedUser, id, answer }){
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            users = {
                ...users,
                [authedUser]:{
                    ...users[authedUser],
                    answered: {
                        ...users[authedUser].answered,
                        [id]: answer
                    }
                }
            }

            questions = {
                ...questions,
                [id]:{
                    ...questions[id],
                    [answer]: {
                        ...questions[id][answer],
                        votes : questions[id][answer].votes.concat([authedUser])
                    }
                }
            }

            res()
        }, 600)
    })
}