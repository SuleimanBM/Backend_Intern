const readline = require('readline');
let Tasks = [
    {name: "Task1", description: "Tidy up the room"},
    {name: "Task2", description: "Get some foodstuff"},
    {name: "Task3", description: "Wash the car"},
    {name: "Task4", description: "Read a book"},
];
const Viewtask = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (Tasks.length === 0) {
                console.log("No tasks to show");
            } else {
                Tasks.forEach((task) => {
                    console.log(`${task.name}: ${task.description}`);
                });
            }
            resolve();
        }, 1000);
        console.log("loading task....");
    });
};
const rdl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const addingtask = async () => {
    return new Promise((resolve) => {
        rdl.question("Enter task name: ", (data1) => {
            rdl.question("Enter task description: ", (data2) => {
            setTimeout(() => {
            Tasks.push({ name: data1, description: data2 });
            console.log("Task added successfully");
            resolve();
            },2000)
            console.log("adding task....");
            });
        });
    });
};

// Main program loop
const programme = async () => {
   
    const question = () => {
        return new Promise((resolve) => {
            rdl.question(
                "What do you want to do? \n Enter 1 to add task\n Enter 2 to view pending tasks\n Enter 3 to exit\n",
                (userInput) => {
                    resolve(userInput);
                }
            );
        });
    };
    const response = await question();
    if (response == '1') {
        await addingtask(); 
        await programme(); 
    } else if (response == '2') {
        await Viewtask(); 
        await programme();  
    } else if (response == '3') {
        console.log("Exiting...");
        rdl.close();
    } else {
        console.log("Invalid input, please enter 1, 2 or 3");
        await programme();
    }
};

programme();

