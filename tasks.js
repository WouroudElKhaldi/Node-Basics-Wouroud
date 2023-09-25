
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}
const fs = require('fs');
const saveFileName = process.argv[2] || 'data.json';

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.replace('\n','');
  if (text === 'quit' || text === 'exit' || text === 'quit ' || text === 'exit ') {
    quit();
  }
  else if(text === 'hello' || text === "hello "){
    hello();
  }
  /*
  *i talkes the first word to be the command "hello" and then i trim in order to access the name at itsown
  */
  else if (text.startsWith("hello ")) {
    const name = text.trim().substring(6);
    hello(name);
  }
  else if (text === 'help' || text === 'help ') {
    help();
  }
  else if (text === 'list' || text === 'list ') {
    list();
  }
  else if (text === "add" || text === 'add ') {
    console.log("Error , missing the task you wanna add")
  }
  else if (text.startsWith("add ")) {
    const task = text.trim().substring(4) ;
    add(task) ;
  }
  else if (text === "remove" || text === 'remove ') {
    removeLastItem();
  }
  else if (text.startsWith("remove")){
    const splitRemove = text.trim().split(" ");
    const indexToRemove = parseInt(splitRemove[1]) -1 ;
    if (indexToRemove >= 0 && indexToRemove < tasks.length) {
    remove(indexToRemove);
  } else {
    console.log("Invalid task number!")
  }
  } 
  else if (text === "edit" || text === 'edit ') {
    console.log("Error , missing the task you wanna edit")
  } 
  else if (text.startsWith("edit")) {
    const splitEdit = text.trim().split(' ');
    if (splitEdit.length >= 2) {
      if(!isNaN(splitEdit[1])) {
        const indexToEdit = parseInt(splitEdit[1]) - 1 ;  
        if (indexToEdit >= 0 && indexToEdit < tasks.length) {
          const newTask = splitEdit.slice(2).join(' ') ;
          editTask(newTask , indexToEdit) ;       
        } else {
        console.log("Invalid task number")
      }
    } else {
          const newTask = splitEdit.slice(1).join(' ');
          editLastItem(newTask) ;
        }
    } else {
      console.log("Invalid edit format")
    }
  }
  else if (text.startsWith("check ")){
    const taskNumber = parseInt(text.trim().substring(6));
    if (!isNaN(taskNumber)){
      check(taskNumber);
    }
  }
  else if (text.startsWith("uncheck ")){
    const taskNumber = parseInt(text.trim().substring(8));
    if (!isNaN(taskNumber)){
      uncheck(taskNumber);
    }
  }
  else if (text === 'clear' || text === 'clear '){
    process.stdout.write('\x1Bc');
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @param {string}
 * @returns {void}
 * The initial value of the name word is wouroud so if the user didn't type a specific name , it will take wouroud
 */
function hello(word = "Wouroud"){
  console.log(`Hello ${word} !`);
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!');
  fs.writeFileSync(saveFileName, JSON.stringify(tasks));
  process.exit();
}

/** 
 * Help function
 * 
 * @returns {void}
 */
function help() {
  console.log(`All possible commands: 
  1. hello: for saying hello wouroud!
  2. hello (name): to print "hello + (name entered) !" 
  3. quit: for quitting the app
  4. exit: for quitting the app
  5. help: to see all possible commands 
  6. list: to list all existing tasks 
  7. add (taskName): to add a task to the list 
  8. remove: for removing the last item in the tasks list 
  9. remove (task index/number): to remove the task based on its index number 
  10. edit (new text): Edit the last item in tasks
  11. edit (taskIndex) (new text): Edit the item based on index number
  12. check (task number): mark the task as done based on its number
  13. uncheck (task number): mark the task as undone based on its number
  14. clear: clear the app`
  )
}

/**
 * list all tasks
 *
 * @returns {void}
 */  
let tasks = [];
try {
  tasks = JSON.parse(fs.readFileSync(saveFileName));
} catch (err) {
  // Handle the case where the file doesn't exist or is invalid
  console.error('Error loading data:', err.message);
}
function list(){
  console.log('Tasks:') ;
  tasks.forEach((task , index) => {
    const checkbox = task.done ? '[✓]' : '[ ]';
    console.log(`${index + 1}: ${checkbox} ${task.text}`);
  });
}

/**
 * add task to teh tasks list
 *
 * @returns {void}
 */ 
function add(taskDescription) {
  const task = { text: taskDescription , done: false};
  tasks.push(task) ;
  console.log(`Task ${taskDescription} added.`)
}

/**
 * remove the task with the index entered by the user
 *
 * @returns {void}
 */ 
function remove(index){
  const taskRemoved = tasks.splice(index , 1)[0];
  console.log(`Task ${taskRemoved.text} is removed`)
}

/**
 * remove the last item in the tasks
 *
 * @returns {void}
 */ 
function removeLastItem(){
  if (tasks.length === 0) {
    console.log("No tasks to remove.")
  } 
  else {
    const lastTask = tasks.pop() ;
    console.log(`Task ${lastTask.text} is removed.`)
  }
}

/**
 * edit the last item in the tasks
 *
 * @returns {void}
 */ 
function editLastItem(newTask){
  if (tasks.length === 0){
    console.log("there is no tasks to edit.")
  } else {
    tasks[tasks.length - 1].text = newTask ;
    console.log(`Edited the last task to : ${newTask}`)
  }
}

/**
 * edit the item specifid by the index in the tasks
 *
 * @returns {void}
 */ 
function editTask(newTask , index){
  tasks[index].text = newTask;
  console.log(`Edited the task ${index + 1} to : ${newTask}`)
}

/**
 * check the task as done
 *
 * @returns {void}
 */ 
function check(taskNumber){
  const index = taskNumber - 1 ;
  if (index >= 0 && index < tasks.length){
    tasks[index].done = true ;
    console.log(`Task ${taskNumber} is checked as done.`) ;
  } else {
    console.log('Invalid task number') ;
  }
}

/**
 * uncheck the task as done
 *
 * @returns {void}
 */ 
function uncheck(taskNumber){
  const index = taskNumber - 1;
  if (index >= 0 && index < tasks.length){
    tasks[index].done = false ;
    console.log(`Task ${taskNumber} is checked as undone.`)
  } else {
    console.log('Invalid task number') ;
  }
}

// The following line starts the application
startApp("Wouroud El Khaldi")
