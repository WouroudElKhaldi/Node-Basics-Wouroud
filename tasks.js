
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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n'){
    hello();
  }
  /*
  *i talkes the first word to be the command "hello" and then i trim in order to access the name at itsown
  */
  else if (text.startsWith("hello ")) {
    const name = text.trim().substring(6);
    hello(name);
  }
  else if (text === 'help\n') {
    help();
  }
  else if (text === 'list\n') {
    list();
  }
  else if (text === "add\n") {
    console.log("Error , missing the task you wanna add")
  }
  else if (text.startsWith("add ")) {
    const task = text.trim().substring(4) ;
    add(task) ;
  }
  else if (text === "remove\n") {
    removeLastItem();
  }
  else if (text.startsWith("remove")){
    const splitted = text.trim().split(" ");
    const indexToRemove = parseInt(splitted[1]) -1 ;
    if (indexToRemove >= 0 && indexToRemove < tasks.length) {
    const removedTask = remove(indexToRemove);
    console.log(`Task ${removedTask} is removed`) ;
  } else {
    console.log("Invalid task number!")
  }
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
function hello(word = "Woroud"){
  console.log(`Hello ${word} !`);
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

/** 
 * Help function
 * 
 * @returns {void}
 */
function help() {
  console.log('All possible commands: \nhello: for saying hello wouroud!\nhello (name): to print "hello + (name entered) !" \nquit: for quitting the app\nexit: for quitting the app\nhelp: to see all possible commands')
}

/**
 * list all tasks
 *
 * @returns {void}
 */  
const tasks = ["Buy groceries", "Clean the house"]
function list(){
  console.log('Tasks:') ;
  tasks.forEach((task , index) => {
    console.log(`${index + 1}: ${task}`)
  });
}

/**
 * add task to teh tasks list
 *
 * @returns {void}
 */ 
function add(task) {
  tasks.push(task) ;
  console.log(`Task ${task} added.`)
}

/**
 * remove the task with the index entered by the user
 *
 * @returns {void}
 */ 
function remove(index){
  const taskRemoved = tasks.splice(index , 1)[0];
  return taskRemoved
}

/**
 * remove the last item in the task all tasks
 *
 * @returns {void}
 */ 
function removeLastItem(){
  if (tasks.length === 0) {
    console.log("No tasks to remove.")
  } 
  else {
    const lastTask = tasks.pop() ;
    console.log(`Task ${lastTask} is removed.`)
  }
}

// The following line starts the application
startApp("Wouroud El Khaldi")
