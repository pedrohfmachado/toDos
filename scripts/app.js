const addTaskBtn = document.getElementById('add-btn');
const fltrBtn = document.getElementById('fltr-btn');
const taskResults = document.getElementById('tasks-results');
const backdrop = document.getElementById('backdrop');
const deleteCard = document.getElementById('delete-card');
// const cardBtnYes = document.getElementById('card-btn-yes');
const cardBtnNo = document.getElementById('card-btn-no');
const showTask = document.querySelector('.tasks');
const toTopBtn = document.getElementById('to-top-btn');
const sortBtn = document.getElementById('srt-btn');
const extractedTask = JSON.parse(localStorage.getItem('tasks'));

tasks = [];


const getData = () => {
  const usrTitle = document.getElementById('title').value;
  const usrDescription = document.getElementById('description').value;
  const usrDate = document.getElementById('date').value;
  const usrTime = document.getElementById('time').value;
  let fixedDate;
  
  if (usrTitle.trim() === '') {
    alert(`You've forgot the Title!`)
    return
  };

  if (!usrDate) {
    fixedDate = '--';
    }
    else {
      fixedDate = new Date(usrDate);
  }

  const newTask = {
    title: usrTitle,
    description: usrDescription,
    date: fixedDate,
    time: usrTime,
    id: Math.random().toString()
  }
  
  tasks.unshift(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('tasks', tasks);

  render();
};


const closeBackdrop = (closestLi) => {
  console.log('var dentero do closeback',closestLi );
  // cardBtnYes.removeEventListener('click', deleteTask.bind(null, elId, closestLi));
  backdrop.classList.remove('visible');
  deleteCard.classList.remove('visible');
}

const hideTasks = () => {
  showTask.classList.remove('visible');
};

const showTasks = () => {
  showTask.classList.add('visible');
};


const deleteQuestion = (elId,closestLi) => {
  console.log('closestLi', closestLi);
  detailedCardClose(closestLi);
  backdrop.classList.add('visible');
  deleteCard.classList.add('visible');
  console.log('elId dentro do certeza? to na versao', elId);
  backdrop.addEventListener('click', closeBackdrop.bind(null, closestLi));
  cardBtnNo.addEventListener('click', closeBackdrop.bind(null, closestLi));
  // cardBtnYes.removeEventListener('click', deleteTask.bind(null, elId, closestLi));

  let cardBtnYes = document.getElementById('card-btn-yes');
  cardBtnYes.replaceWith(cardBtnYes.cloneNode(true));
  cardBtnYesNew = document.getElementById('card-btn-yes');
  cardBtnYesNew.addEventListener('click', deleteTask.bind(null, elId, closestLi));
  
};

const deleteTask = (elId, closestLi) => {
  console.log('taskId que mandei deletar',elId);
  console.log('closestLi que mandei deletar',closestLi);
  tasks = tasks.filter(o => o.id !== elId);
  console.log('tasks depois do delete',tasks);
  localStorage.removeItem('tasks');
  localStorage.setItem('tasks', JSON.stringify(tasks));
  closeBackdrop();
  render();
}

const onTimeTest = () => {
  let timerImput = new Date(task.date);
  timerImput.setDate(timerImput.getDate() + 1 );
  let timeToday = new Date();
  const timeCalc = Math.floor((timerImput - timeToday) / (1000*60*60*24));

  if (task.date ==='--') {
    onTimeClass = 'grey';
  } else if (timeCalc < 0) {
    onTimeClass = 'red';
  } else if (timeCalc <= 3) {
    onTimeClass = 'yellow';
  } else {
    onTimeClass = 'green';
  };
};


const filterBtn = () => {
  const filter = document.getElementById('filter').value;
  console.log('Valor do filtro',filter);
  render(filter);
};


const sortTasks = () => {
  const sortImput = document.getElementById('sort').value;
  if (!sortImput) {
    return
  } else (
    sortArray = tasks.sort((a, b) => {
      if (a[sortImput] > b[sortImput]) {
        return 1;
      } else if (a[sortImput] === b[sortImput]) {
        return 0;
      } else {
        return -1;
      }
    })
  );
  filterBtn();
};

const detailedCardOpen = (closestLi) => {

  closestLi.classList.add('detailedClass');
  backdrop.classList.add('visible');

  const idAux = closestLi.id
  const detailTask = tasks.find((task) => {
    return task.id === idAux;
  });
  
  closestLi.querySelector('h2:nth-of-type(1)').textContent = detailTask.title;
  closestLi.querySelector('h2:nth-of-type(1)').textContent = detailTask.description;
  
  backdrop.addEventListener('click', detailedCardClose.bind(null, closestLi));
}

const detailedCardClose = (closestLi) => {
  closestLi.classList.remove('detailedClass');
  backdrop.classList.remove('visible');
  fixedTitleHandler();
  fixedDescriptionHandler();
  closestLi.querySelector('h2:nth-of-type(1)').textContent = fixedTitle;
  closestLi.querySelector('h2:nth-of-type(1)').textContent = fixedDescription;
  filterBtn();
}


const fixedTitleHandler = () => {
  fixedTitle = task.title.length > 13
  ? task.title.substring(0,13) + '...' 
  : task.title;
}

const fixedDescriptionHandler = () => {
  fixedDescription = task.description.length > 80
  ? task.description.substring(0,80) + '...'
  : task.description;
}

const fixedDateHandler = () => {
  // let xyz = task.date;
  let datePosStorage = new Date (task.date);
  // console.log('bbbbb', xyz.toISOString());
  // console.log('bbbbb', xyz.toLocaleDateString('pt-br',{timeZone: 'UTC'}));
  // console.log('xyz', xyz);
  fixedDate = task.date === '--'
  ? '--'
  : datePosStorage.toLocaleDateString('pt-br',{timeZone: 'UTC'});
}


const render = (filter = '') => {
  
  const filtered = !filter ? tasks :
  tasks.filter(task => task.title.includes(filter) ||
  task.description.includes(filter));


  const listElement = document.getElementById('tasks-results');
  const taskTemplate = document.getElementById('single-task');
  

  if (filtered.length === 0) {
    hideTasks()
  } else {
    showTasks();
  }
  
  taskResults.innerHTML = '';
  // let btnIncHandler = 0;

  for (task of filtered) {
    // btnIncHandler = btnIncHandler + 1;
    // console.log('btnIncHandler',btnIncHandler);

    onTimeTest();

    fixedTitleHandler();
    fixedDescriptionHandler();
    fixedDateHandler();

    const postEl = document.importNode(taskTemplate.content, true);
    const postElScroll = postEl.querySelector('li');
    postEl.querySelector('li').id = task.id;
    postEl.querySelector('li').classList.add(onTimeClass);
    postEl.querySelector('h1:nth-of-type(1)').textContent = fixedTitle.toUpperCase();
    postEl.querySelector('h2:nth-of-type(1)').textContent = fixedDescription;
    postEl.querySelector('h3:nth-of-type(1)').textContent = `${fixedDate} - ${task.time}`;
    // postEl.querySelector('h3:nth-of-type(2)').textContent = task.time;


    // postEl.querySelector('button').classList.add(`btn-${btnIncHandler}`);
    // const btnGato = postEl.querySelector(`.btn-${btnIncHandler}`);
    // // const testenome = postEl.querySelector('button').classList.con = `.btnn-${btnIncHandler}` ? 'sim' : 'não';
    // // console.log('testenome',testenome);

    // const nomeBtn = `btn-${btnIncHandler}`
    // const taskId = task.id;
    // const closestLi = postEl.querySelector('li');
    // btnGato.addEventListener('click', deleteQuestion.bind(null, taskId, closestLi, nomeBtn));

    // console.log('gato do bnotao', btnGato);


    const closestLi = postEl.querySelector('li');
    listElement.append(postEl);
    postElScroll.scrollIntoView({behavior: 'smooth'});
    closestLi.addEventListener('click', detailedCardOpen.bind(null, closestLi));
    
    const taskId = task.id;
    const btnTeste = closestLi.querySelector('button');
    // btnTeste.removeEventListener('click', deleteQuestion.bind(null, taskId, closestLi));
    btnTeste.addEventListener('click', deleteQuestion.bind(null, taskId, closestLi));
    
  }

};

addTaskBtn.addEventListener('click', getData);
fltrBtn.addEventListener('click', filterBtn);
sortBtn.addEventListener('click', sortTasks);

/* taskResults.addEventListener('click', event => {
  if (event.target.className === 'btn-task') {
    const taskId = event.target.closest('li').id;
    const closestLi = event.target.closest('li');
    console.log('Id do li que cliquei - taskId',taskId);
    console.log('closestLi do li que cliquei - taskId',closestLi);
    deleteQuestion(taskId, closestLi);

  } 

}); */


toTopBtn.addEventListener('click', event=> {
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });;
});

const init = () => {
  const extractedTask = JSON.parse(localStorage.getItem('tasks'));
  console.log('extractedTask no init',extractedTask);
  if (extractedTask) {
    tasks = tasks.concat(extractedTask);
    console.log('tasks dentro no init', tasks);
    console.log('extractedTask', extractedTask);
  } else {
    return
  }
  render();
}

init() 