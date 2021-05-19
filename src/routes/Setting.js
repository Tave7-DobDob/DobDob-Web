import REACT, { useState } from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
const Setting=()=>{
    const [selectLoca, setSelectLoca]=useState({
        Si:"",
        Gu:"",
        Dong:""
    });
    const [nickname, setNickname]=useState("");
    const [errorMess, setErrorMess]=useState("");
    const [checkError, setCheckError]=useState("");
    const [checkNick, setCheckNick]=useState(false);
    //지역 목록
    const optionSi=[{value:"서울시", label:"서울시"},{value:"부산광역시", label:"부산광역시"}]
    const optionGu={서울시:[{value:"강남구", label:"강남구"},{value:"강남구", label:"강남구"}],
    부산광역시:[{value:"부산광역시", label:"부산광역시"}]}
    const optionDong={강남구:[{value:"서울시", label:"서울시"}],동작구:[{value:"부산광역시", label:"부산광역시"}]}
    const history=useHistory();
    const styles = {
        option: (provided, state) => ({
          ...provided,
          width:100,
          fontSize: "small",
        }),
        dropdownIndicator:(provided)=>({
            ...provided,
            width:30,
        }),
        control: (provided) => ({
            ...provided,
            width: 80,
            height:0,
            borderRadius:0
        }),
          menu: (provided) => ({
          ...provided,
          width:100,
        })
      };
    const onSelected=(value, name)=>{
        console.log(name)
        setSelectLoca(selectSi=>({...selectSi, [name]:value}));
    }
    const onSubmit=(event)=>{
        event.preventDefault();
        //설정값 post
        try{
            if(!checkNick)throw new Error('중복확인을 해주세요.');
            if(selectLoca.Si==""||selectLoca.gu==""||selectLoca.Dong=="")   throw new Error('동네를 설정해주세요.');
            
            history.push("/main");
        }catch(error){
            if(!checkNick)setCheckError(error.message);
            else setErrorMess(error.message);
            console.log(error.message)
        }
    }
    const onChange=(event)=>{
        const {target:{value}}=event;
        setNickname(value);
    }
    const onCheck=()=>{
        //중복확인
        setCheckNick(true);
        setCheckError("");
    }
    return (<><div className="Container setting">
    
    <header><img src="logo2.png" width="80px"/></header>
    <div className="setting-wrapper">
        <div className="text-wrapper">
            <h1>돕돕 에서 사용할 <br/> 닉네임과 나의 동네를 설정하여 <br/>지금 이웃들을 만나보세요 !</h1>
            <p>닉네임과 나의 동네는 추후에도 변경이 가능합니다.</p>
            <img src="setting.png" width="100%"/>
        </div>
        <div className="centerContainer form-wrapper-wrapper">
        <div className="centerContainer form-wrapper">
            <form onSubmit={onSubmit}>
            <span>닉네임</span>
            <div className="nickname-wrapper">
            <input type="text" required value={nickname} onChange={onChange} placeholder="중복 불가"/>
            <button onClick={onCheck}>중복확인</button>
            
            <span id="error">{checkError}</span>
            </div>
            <span>내 동네 설정</span>
            <div className="select-wrapper">
            <Select id="select" styles={styles} placeholder="시/도" options={optionSi} name="Si"  onChange={(value, name)=>onSelected(value.value, name.name)}></Select>
            <Select id="select" styles={styles} placeholder="구/군" options={optionGu[selectLoca.Si]} name="Gu" onChange={(value, name)=>onSelected(value.value, name.name)}></Select>
            <Select id="select" styles={styles} placeholder="동/읍" options={optionDong[selectLoca.Gu]}name="Dong" onChange={(value, name)=>onSelected(value.value, name.name)} ></Select>
            
            </div>
            <span id="error">{errorMess}</span>
               <input type="submit" value="완료"/>
            </form>
           
        </div>
        </div>
        
    </div>
</div></>)
}

export default Setting ;