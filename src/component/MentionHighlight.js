import REACT from 'react';

import reactStringReplace from 'react-string-replace';
const MentionHighlight=({content})=>{
    return (
        <div className="comment-highlight">
            {content.split('\n').map(line =>
                <div>
                    {reactStringReplace(line, /(@\S+)/g, (match, i) => {
                        return (
                            <span style={{ color: '#1b73d8' }}>{match}</span>
                        )
                    }
                    )}
                    <br />
                </div>)}
        </div>
    );
}
export default MentionHighlight;