import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import DaumPost from '../component/DaumPost';
const Posting = () => {
    const history = useHistory();
    const [attachments, setAttachments] = useState(null);
    const [tag, setTag] = useState("");//태그필드값
    const [textObj, setTextObj] = useState({
        title: "",
        content: ""
    })//제목, 내용 값
    const [tagArr, setTagArr] = useState([]);//태그 arr
    const [isOpenModal, setIsOpenModal] = useState(false);//for 주소검색 component
    const [address, setAddress] = useState("");//for 주소검색 component
    const [locationObj, setLocationObj] = useState(null);//for 주소검색 component

    useEffect(() => {
        //db comment 받아오기
        //post.postID로 comment 검색

    }, []);
    const onClickLogo = () => {
        history.push("/main");//메인페이지 이동
    }
    const onChange = (event) => {
        const { target: { value, name } } = event;
        //태그필드 onChange
        if (name == "tag") {
            //태그 검색 기능 추가
            setTag(value);
            if (value == " ") { setTag(value.replace(' ', '')); }
            else if ((value.indexOf(" ")) != -1) {
                setTag("");
                setTagArr(tagArr => ([...tagArr, value]));
            }
        }
        //제목 , 내용 필드 onChange
        else {
            setTextObj(textObj => ({ ...textObj, [name]: value }));
        }
    }
    //for 주소검색 component
    const onClickLocation = () => {
        setIsOpenModal(true);
    }
    const onFileChange = (event) => {
        //사진 arr 처리
        const { target: { files } } = event;
        const fileArr = [];
        let filesLength = files.length > 5 ? 5 : files.length;
        let file;
        for (let i = 0; i < filesLength; i++) {
            file = files[i];

            let reader = new FileReader();
            reader.onload = () => {
                fileArr[i] = reader.result;
                setAttachments([...fileArr]);
                console.log([...fileArr])
            };
            reader.readAsDataURL(file);
        }
    };
    const onClickDelTag = (idx) => {
        //태그 삭제 기능
        let arr = tagArr;
        arr.splice(idx, 1)
        setTagArr([...arr])
    }
    const onSubmit = (event) => {
        event.preventDefault();
        //db로 전송할 postObj
        const postObj = {
            userId: "",
            locationId: "",
            title: textObj.title,
            content: textObj.content,
            isDeleted: false,
            createdAt: new Date(),
        }
        const postTag = tagArr;
        const postImage = attachments;

    }

    return (<>
        <div className="Container posting">
            <header><img src="logo2.png" width="60px" onClick={onClickLogo} /></header>
            <div className="centerContainer main-content">
                {isOpenModal && <DaumPost setAddress={setAddress} setLocationObj={setLocationObj} />}
                <div className="centerContainer posting-container">
                    <div className="menu-wrapper">
                        <span className="location" data-toggle="tooltip" title="위치 재설정" onClick={onClickLocation}><FontAwesomeIcon icon={faMapMarkerAlt} id="marker" color="#ffc600" /> {locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
                        <label for="photo-upload" data-toggle="tooltip" title="사진 첨부"><FontAwesomeIcon icon={faImages} /> <span>사진(최대 5장)</span></label>
                        <input multiple="multiple" type="file" onChange={onFileChange} id="photo-upload" style={{ display: "none" }} />
                    </div>
                    <div className="posting-wrapper">
                        <form onSubmit={onSubmit}>
                            <input type="text" name="title" placeholder="제목을 입력하세요." value={textObj.title} onChange={onChange} />
                            <hr />
                            {attachments != null && <>
                                <span id="img-count">{attachments.length}/5</span>
                                <div className="attachment-wrapper">
                                    {attachments.map(img => <img src={img} width="100px" />)}
                                </div>
                                <hr /></>}
                            <TextareaAutosize name="content" placeholder="내용을 입력하세요." id="text-box" value={textObj.content} onChange={onChange} />
                            <input type="submit" id="submit-btn" value="완료" />
                        </form>
                        <div className="tag-wrapper posting-tag-wrapper">
                            <span>#</span>
                            <input type="text" name="tag" value={tag} onChange={onChange} placeholder="태그를 입력해보세요 !" />
                            {tagArr.map((tag, index) => <div class="centerContainer tag-box"><span>{tag}<span id="del-btn" onClick={() => onClickDelTag(index)}>X</span></span>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default Posting;
