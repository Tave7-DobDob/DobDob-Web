import React from 'react';
import { useBeforeunload } from 'react-beforeunload';
import Header from '../component/Header';
import Head from '../component/Posting/Head';
import PostingForm from '../component/Posting/PostingForm';
import { useFileInput } from '../component/useInput';
import '../styleSheets/posting.css';
const Posting = () => {
    useBeforeunload((event) => event.preventDefault());

    const [fileArr, setFileArr, attachments, _] = useFileInput([],null);
    return (<>
        <div className="Container posting">
            <Header/>
            <div className="centerContainer main-content">
                <div className="centerContainer posting-container">
                    <Head setFileArr={setFileArr}/>
                    <div className="posting-wrapper">
                        <PostingForm fileArr={fileArr} attachments={attachments}/>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default Posting;
