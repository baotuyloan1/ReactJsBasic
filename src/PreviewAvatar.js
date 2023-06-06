import {useEffect, useState} from "react";

function PreviewAvatar() {
    const [avatar, setAvatar] = useState();
    const [imgs, setImgs] = useState();
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setAvatar(file)

        e.target.value = null;
        console.log(123)

    }
    useEffect(() => {
        // clean up
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        }
    }, [avatar])


    useEffect(() => {
        return () => {
            console.log('Clean up')
            if (imgs) {
                imgs.forEach(img => {
                    URL.revokeObjectURL(img.src)
                })
            }
        }
    }, [imgs])
    const handleMultiImages = (e) => {
        const files = e.target.files;
        console.log('333', [e.target])
        for (var i in files) {
            if (files.hasOwnProperty(i)) {
                files[i].src = URL.createObjectURL(files[i])
            }

        }
        setImgs([...files])
    }


    // useEffect()


    return (<div>
        <input type="file" onChange={handlePreviewAvatar}/>
        <br/>
        {avatar && (<img src={avatar.preview} width='20%'/>)}
        <br/>
        <input type="file" multiple onChange={handleMultiImages}/>
        <br/>
        <br/>
        {imgs && imgs.map((img) => <div key={img.name}><img src={img.src} style={{width: '50%'}}/> <br/></div>)}
        <br/>
        <br/>
    </div>)
}

export default PreviewAvatar