import {useEffect, useState} from "react";

// 1. useEffect(cb)
// - gọi cb mỗi khi component re-render
// - gọi cb sau khi component thêm element vào DOM
// 2. useEffect(cb, [])
// - chỉ gọi cb 1 lần sau khi component mounted
// 3. useEffect(cb,[dep])
// callback sẽ được gọi laị mỗi khi dependency thay đổi
// nó su dung === để so sánh phần tử đó trước render và sau khi render có thay đổi hay không. có thay đổi
// thì mới gọi callback
// ---------
// 1. Callback trong useEffect chỉ được gọi sau khi element đã được render vào DOM.
// 2. cleanup function luôn được gọi trước khi component unmounted
// 3. Cleanup function luôn được gọi trước khi callback được gọi (trừ lần mounted)
//  điều này giúp khi 1 logic mới được chạy thì nó clear logic cũ giúp tránh việc leak memory.
const tabs = ['categories', 'products', 'laptops']

function Content() {

    const [countdown, setCountdown] = useState(180);
    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [type, setType] = useState(0);
    const [count, setCount] = useState(1);

    useEffect(() => {
        console.log(`http://localhost:8080/api/${tabs[type]}`)
        fetch(`http://localhost:8080/api/${tabs[type]}`)
            .then(res => res.json())
            .then(categories => {
                setCategories(categories['_embedded']['categoryDtoList'] || categories['_embedded']['phoneDtoList'].concat(categories['_embedded']['laptopDtoList']));
            });
    }, [type])

    const [showGoToTop, setShowGoToTop] = useState(false);
    useEffect(() => {
        const hanleScroll = () => {
            setShowGoToTop(window.scrollY > 200)
            console.log('scroll', window.scrollY);
        }
        window.addEventListener('scroll', hanleScroll);
        console.log('add event listener')
        // cleanup function
        return () => {
            console.log("unmounting")
            window.removeEventListener('scroll', hanleScroll)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            console.log(window.innerWidth)
        }
        window.addEventListener('resize', handleResize);

        // cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    useEffect(() => {
        //     setInterval(() => {
        //         setCountdown(countdown - 1);
        //         console.log('Countdown',countdown);
        //     }, 1000)
        // }, [])
        // setTimeout(() => setCountdown(countdown - 1), 1000)
        const timerId = setInterval(() => {
            setCountdown((pre) => (pre - 1), 1000);
        }, 1000);
        return () => {
            clearInterval(timerId);
        }
    }, [])
    console.log('child re-render')

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        console.log(`Mounted or Re-render lần thứ ${count}`);

        return () => {
            console.log(`Cleanup lần thứ ${count}`);
        }
    }, [count])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        console.log(file);
    }
    return <div>
        <input type="file" onChange={handlePreviewAvatar} value={'Chon di'} />
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}> Click me</button>
        <h1>{countdown}</h1>
        <h1>{width}</h1>
        {tabs.map((tab, index) => <button
            style={type === index ? {color: 'red', background: '#333'} : {}}
            key={index} onClick={() => setType(index)}>{tab}</button>)}
        <ul>
            {categories.map(category => <li key={category.id}>{category.name}</li>)}

        </ul>
        <br/>
        <input value={title} onChange={event => setTitle(event.target.value)}/>
        {showGoToTop &&
            <button onClick={() => window.scrollTo(0, 0)} style={{position: 'fixed', right: 20, bottom: 20}}>Go to
                top</button>}
    </div>
}

export default Content;