const nameInput = document.querySelector('.name')
const add = document.querySelector('.add')
const cards = document.querySelector('.cards')

let arrayOfTasks = JSON.parse(localStorage.getItem('array')) || []

if (localStorage.getItem("array")) {
    addTaskToPage(JSON.parse(localStorage.getItem('array')))
    
}


add.addEventListener('click', () => {
    if (nameInput.value !== "") {
        addToArray(nameInput.value)
        nameInput.value = ""
    }
})

function addToArray(taskText) {
    
    const task = {
        id: Date.now(),
        title: taskText
    }
    arrayOfTasks.push(task)
    
    localStorage.setItem("array", JSON.stringify(arrayOfTasks))
    
    addTaskToPage(arrayOfTasks)

}


function addTaskToPage(array = []) {

    cards.innerHTML = ""

    if (array.length !== 0) {

        array.forEach((ele) => {
            cards.innerHTML += `
              <div class="task" data-id=${ele.id}>
                    <p>
                        ${ele.title}
                    </p>
                    <div class="none" >
                        <input type="text" class="edit-input" />
                        <button class="save" >Save</button>
                    </div>
                    <div class="btns">
                        <button class="del">Delete</button>
                        <button class="edit">Edit</button>
                    </div>
                </div>
            `


       

        })
        
            const del = document.querySelectorAll(".del")
            console.log(del)

            for (let i = 0; i < del.length; i++) {
                del[i].addEventListener('click', (e) => {
                            console.log(e)
                            e.target.parentElement.parentElement.remove()
                            arrayOfTasks = arrayOfTasks.filter(ele => ele.id != e.target.parentElement.parentElement.getAttribute('data-id'))
                            addTaskToPage(arrayOfTasks)
                            localStorage.setItem('array', JSON.stringify(arrayOfTasks))
                        })
            }


        const edit = document.querySelectorAll(".edit")
        const tasks = document.querySelectorAll(".task")
        const editInput = document.querySelectorAll('.edit-input')
        const save = document.querySelectorAll(".save")

        for (let i = 0; i < edit.length; i++) {
              
            edit[i].addEventListener('click', (e) => {
                console.log(tasks[i].children)
                tasks[i].children[1].classList.add("show")
                tasks[i].children[0].classList.add("none")
                editInput[i].value = tasks[i].children[0].innerText
                    })
            save[i].addEventListener('click', (e) => {
                tasks[i].children[0].innerText =  editInput[i].value
                tasks[i].children[1].classList.remove("show")
                tasks[i].children[0].classList.remove("none")
                arrayOfTasks[i].title = editInput[i].value
                localStorage.setItem("array", JSON.stringify(arrayOfTasks))
            }) 
                
        }

    }

}



fetch("url", {
    method: "get",
    headers: {

    },
    body: {
        data: arrayOfTasks
    }
}).then(res => console.log(res))


