import {useState} from "react";
import Content from "./Content";

function App() {
    console.log('cha re-render');

    const orders = [100, 200, 300]
    // nó lấy giá trị được return bởi function làm initState chứ không phải lấy hàm làm initState
    const [counter, setCounter] = useState(() => {
        // chỉ chạy 1 lần tăng performance
        return orders.reduce((acc, cur) => acc + cur);
    });
    const [info, setInfo] = useState({
        name: 'Nguyen Van A', age: 23
    })

    const [gift, setGift] = useState();

    const handleUpdate = () => {
        // cách 1
        // setInfo({...info, address: 'Ha Noi'});

        //     cách 2: cần sử lý logic thì dùng cách 2
        setInfo((preInfo) => {

            // xử lý logic...
            return {...preInfo, address: 'Ha Noi'};
        })
    }
    const handleIncrease = () => {
        setCounter(counter + 1);
        setCounter(counter + 1);
        setCounter((prevState) => prevState + 1);
        setCounter((prevState) => prevState + 1);
        console.log(counter);
    };
    const gifts = ['CPU i9', 'RAM 32GB RGB', 'RGB Keyboard']

    const randomGift = () => {
        const index = Math.floor(Math.random() * gifts.length);
        setGift(gifts[index]);
    }

    // two way binding
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // radio two way binding
    const courses = [{
        id: 1, name: 'HTML, CSS'
    }, {
        id: 2, name: 'PHP'
    }, {
        id: 3, name: 'JAVA'
    }]
    const handleRegister = () => console.log(name, email);

    const [checked, setChecked] = useState(1);
    const [bChecked, setBChecked] = useState([]);
    const handleBCheck = (id) => {
        setBChecked(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(item => item !== id);
            } else {
                return [...prevState, id];
            }
        })
    }

    const handleSubmit = () => {
        console.log(bChecked);
    }

    // ?? undified hoac null thi lay thang sau
    const [jobs, setJobs] = useState(() => {
        const storageJobs = localStorage.getItem('jobs');
        return JSON.parse(storageJobs) ?? []
    });
    const [job, setJob] = useState('');

    const clearForm = () => setJob('');
    const handleAddJob = () => {
        setJobs(prevState => {
            const newJobs = [...prevState, job];
            const jsonJobs = JSON.stringify(newJobs);
            localStorage.setItem('jobs', jsonJobs);
            return newJobs;
        });
        clearForm();
    }
    const handleDeleteItem = (job, index) => {
        setJobs((preValue) => {
            const newJobs = [...preValue];
            newJobs.splice(index, 1);
            const jsonJobs = JSON.stringify(newJobs);
            localStorage.setItem('jobs', jsonJobs);
            return newJobs;
        })
    }

    const [show, setShow] = useState(false);
    return (<div className="App" style={{padding: 32}}>
        <button onClick={()=> setShow(!show)}>Toggle</button>
        {show && <Content/> || <br/>}
        <input value={job} onChange={(e) => setJob(e.target.value)}/>
        <button onClick={handleAddJob}>Add</button>
        <ul>
            {jobs.map((job, index) => <li key={index}><span>{job}</span>
                &nbsp;
                <button onClick={() => handleDeleteItem(job, index)}> delete</button>
            </li>)}
        </ul>
        <h3>Checkbox</h3>
        {courses.map(course => <div key={course.id}><input
            onChange={() => handleBCheck(course.id)}
            checked={bChecked.includes(course.id)}
            type='checkbox'/> <label>{course.name}</label></div>)}
        <button onClick={handleSubmit}>Submit</button>

        <h3>Radio</h3>
        {courses.map(course => <div key={course.id}><input
            onChange={() => setChecked(course.id)}
            checked={checked === course.id}
            type='radio'/> <label>{course.name}</label></div>)}
        <input value={name} onChange={(e) => setName(e.target.value)}/>
        <br/>
        <input value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={handleRegister}>Register</button>

        <h1>{gift || 'Chưa có phần thưởng'}</h1>
        <button onClick={randomGift}>Lấy thưởng</button>
        <h1>{counter}</h1>
        <button onClick={handleIncrease}>Increase</button>
        <h1>{JSON.stringify(info)}</h1>
        <button onClick={handleUpdate}>Add address</button>

    </div>);
}

export default App;
