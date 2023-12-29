import { supabase } from "./supabase";

//create user
export async function CreateUser(username, email, password) {
    console.log(username, email, password)
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    })

    if (error) {
        console.log(error)
    }

    if (data.user !== null) {
        return true
    } else {
        return false
    }
}

//sign in user
export async function SignInUser(Email, Password) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: Email,
        password: Password
    })

    if (error) {
        console.log(error)
    }

    if (data.user !== null) {
        return true
    } else {
        return false
    }
}

export async function LogOutUser() {
    await supabase.auth.signOut()
}

export async function GetUser() {
    let { data, error } = await supabase.auth.getUser()
    console.log(data)

    if (error) {
        console.log(error)
    }

    if (data.user !== null) {
        return true
    } else {
        return false
    }
}

//get task sections
export async function getTaskSections(user, setTaskSections) {
    const { data, error } = await supabase
    .from('tasksections')
    .select()
    .eq('id', user.user.id)

    if(data) {
        setTaskSections(data)
    }

    if (error) {
        console.log(error)
    }
}

//add new taskSection
export async function addNewTaskSection(user, taskSectionName) {
    const { data, error } = await supabase
    .from('tasksections')
    .update({ task_sections: taskSectionName})
    .eq('id', user.user.id)

    if (data) {
        console.log(data)
    }

    if (error) {
        console.log(error)
    }
}

//delete a task section
export async function deleteTaskSection(user, taskSectionName) {
    const { data, error } = await supabase
    .from('tasksections')
    .update({ task_sections: taskSectionName})
    .eq('id', user.user.id)

    if (data) {
        console.log(data)
    }

    if (error) {
        console.log(error)
    }
}

//add a task
async function addInitialTask(user, selectedTaskSection, taskName) {
    const {data, error } = await supabase
    .from('tasks')
    .insert({id: user.user.id, tasks: `${selectedTaskSection}#$#:#$#${taskName}`})

    if (data) {
        console.log(data)
    }

    if (error) {
        console.log(error)
    }
}

async function updateToAddTask(user, prevTaskStatement, selectedTaskSection, taskName) {
    const {data, error } = await supabase
    .from('tasks')
    .update({tasks: `${prevTaskStatement})#$#:#$#(${selectedTaskSection}#$#:#$#${taskName}`})
    .eq('id', user.user.id)

    if (data) {
        console.log(data)
    }

    if (error) {
        console.log(error)
    }
}

export async function addNewTask(user, selectedTaskSection, taskName) {
    const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('id', user.user.id)

    if (data) {
        if (data.length === 0) {
            addInitialTask(user, selectedTaskSection, taskName)
        } else {
            updateToAddTask(user, data[0].tasks, selectedTaskSection, taskName)
        }
    }

    if (error) {
        console.log(error)
    }
}

//get tasks
export async function getTasks(user, setTasks) {
    const { data, error } = await supabase
    .from('tasks')
    .select()
    .eq('id', user.user.id)

    if(data) {
        setTasks(data)
    }

    if (error) {
        console.log(error)
    }
}
