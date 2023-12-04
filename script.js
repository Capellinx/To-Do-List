const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  {title: "Fazer exercícios físicos", type: "Normal"},
  {title: "Agendar consulta médica", type: "Urgente"},
  {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  {title: "Limpar a despensa", type: "Importante"},
  {title: "Pagar a conta de energia", type: "Urgente"},
  {title: "Assistir a um documentário interessante", type: "Normal"},
];
const btnAddTask = document.querySelector('.form__button--add-task');
const searchTask = document.querySelector('.header__input--search')
const itemTask = document.getElementsByClassName('task__item');
const taskPriority = document.querySelector('#input_priority');
const section = document.querySelector('.tasks__container');
const taskTitle = document.querySelector('#input_title');

btnAddTask.addEventListener('click', addNewTask)
searchTask.addEventListener('input', findItemTask)
renderElements(tasks)

function renderElements(lista){
    const listContainer = document.querySelector('ul');
    listContainer.innerHTML = '';
    
    for(let i = 0; i < lista.length; i++){
        let elements = createTaskItem(lista[i]);
        listContainer.appendChild(elements);
    };
    section.appendChild(listContainer);
};

function createTaskItem(taskItem){
    const buttonRemove = document.createElement('button');
    const division = document.createElement('div');
    const listItem = document.createElement('li');
    const paragaph = document.createElement('p')    
    const span = document.createElement('span');
    const taskItemType = taskItem.type.toLowerCase();

    span.classList.add('task-type');
    listItem.classList.add('task__item');
    division.classList.add('task-info__container');
    buttonRemove.classList.add('task__button--remove-task');
    paragaph.innerText = taskItem.title;

    if(taskItemType == 'urgente'){
        span.classList.add('span-urgent');
    } else if(taskItemType == 'importante') {
        span.classList.add('span-important');
    } else{
        span.classList.add('span-normal');
    };

    listItem.append(division, buttonRemove);
    division.append(span, paragaph);
 
    buttonRemove.addEventListener('click', () => {
        let taskIndex = tasks.indexOf(taskItem);
         if(taskIndex !== -1) {
            tasks.splice(taskIndex, 1); 
            renderElements(tasks);
        }
    })

    return listItem;
};

function addNewTask(e){
    e.preventDefault();
    let taskTitleValue = taskTitle.value;
    let taskPriorityValue = taskPriority.value;

    validationInputValue(taskTitleValue, taskPriorityValue)
    taskTitle.value = '';
    taskPriority.value = '';
};

function validationInputValue(title, priority){
    if(!title || !priority){
        alert('Error: necessaráio preencher todos os campos!');
    }else {
        tasks.push({title: title, type: priority});
        alert('Tarefa Adcionada com sucesso!');
        renderElements(tasks);
    };
};

function findItemTask(){
    let searchValue = searchTask.value.toLowerCase()

    for(let i = 0; i < itemTask.length; i++){
        let taskItem = itemTask[i].innerHTML.toLowerCase()

        if(!taskItem.includes(searchValue)){
            itemTask[i].style.display = 'none'
        }else{
            itemTask[i].style.display = 'flex'
        }
    }
}