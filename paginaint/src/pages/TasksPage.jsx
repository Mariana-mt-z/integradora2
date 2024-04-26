import {useAuth} from '../context/Auth.Context'

function TaskPage (){
    const {user} = useAuth()
    console.log(user)
    return (
        <div>TaskPage</div>
    )

}
export default TaskPage 