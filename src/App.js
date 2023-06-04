import {useState} from "react";

function App() {

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
    }]
    const handleRegister = () => console.log(name, email);

    const [checked, setChecked] = useState(1);
    const [bChecked, setBChecked] = useState([]);

    const handleBCheck = (id) => {
        if (bChecked.includes(id)) {
            setBChecked(bChecked.filter(item => item !== id));

        } else {
            setBChecked([...bChecked, id]);
        }

        console.log(bChecked)

    }

    return (<div className="App" style={{padding: 32}}>
        <h3>Checkbox</h3>
        {courses.map(course => <div key={course.id}><input
            onChange={() => handleBCheck(course.id)}
            checked={bChecked.includes(course.id)}
            type='checkbox'/> <label>{course.name}</label></div>)}

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
