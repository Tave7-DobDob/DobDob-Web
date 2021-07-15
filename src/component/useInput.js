import React, {  useState, useCallback } from 'react';

export function useInput(initalValue = null) {

  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    e => {
      const { value, name } = e.target;
      setData(value);
    },
    [data]
  );
  return [data, handler];
};

export function useInputObj(initalValue = null) {

  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    e => {
      const { value, name } = e.target;

      setData({
        ...data,
        [name]: value
      });
    },
    [data]
  );
  return [data, handler];
};
export function useFileInput(initalValue = null,initalValueArr=null){

  const [fileArr, setFileArr] = useState(initalValue);
  const [attachment, setAttachment] = useState(initalValueArr);

  const handler = useCallback(
    e => {
      const { target: { files } } = e;
      setFileArr(files)
      const attachmentArr = [];
      let filesLength = files.length > 5 ? 5 : files.length;
      let file;

      for (let i = 0; i < filesLength; i++) {
          file = files[i];
          let reader = new FileReader();
          reader.onload = () => {
              attachmentArr[i] = reader.result;
              setAttachment([...attachmentArr]);
          };
          reader.readAsDataURL(file);
      }},
    [fileArr, attachment]
  );

  return [fileArr, handler, attachment, handler];
}
export function useTagInput(initalValue = null, initalValueArr = null) {
  const [tag, setTag] = useState(initalValue);
  const [tagArr, setTagArr] = useState(initalValueArr);

  const handler = useCallback(
    e => {
      const { value, name } = e.target;
      setTag(value);
      if (value == " ") { setTag(value.replace(' ', '')); }
      else if ((value.indexOf(" ")) != -1) {
        setTag("");
        if (!tagArr.includes(value)) {
          setTagArr(tagArr => ([...tagArr, value.replace(' ', '')]));
        }
      }

    },
    [tag, tagArr]
  );
  const onClick = (idx) => {
    //태그 삭제 기능
    let arr = tagArr;
    arr.splice(idx, 1)
    setTagArr([...arr])
  }
  return [tag, handler, tagArr, handler, onClick];
};
