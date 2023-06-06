import {useEffect, useState} from "react";


const lessons = [{
    id: 1, name: 'ReactJs là gì? Tại sao nên học ReactJS'
}, {
    id: 2, name: 'SPA/MPA là gì ?'
}
]
var id = 1;

function AppChat() {
    const [lessonId, setLessonId] = useState(1);

    console.log('re-render',lessonId);
    useEffect(() => {
        const handleComment = ({detail}) => {
            console.log(detail);
        }
        window.addEventListener(`lesson-${lessonId}`, handleComment)
        console.log('add event', lessonId)
        // clean up function
        return (() => {
            window.removeEventListener(`lesson-${lessonId}`, handleComment)
            console.log('remove', lessonId)
        })
    }, [lessonId])
    return (<div>
        <ul>
            {lessons.map((lesson) =>
                <li key={lesson.id} onClick={() => setLessonId(lesson.id)}
                    style={{color: lessonId === lesson.id ? 'red' : '#333 '}}>{lesson.name}</li>
            )}
        </ul>
    </div>)
}

export default AppChat;