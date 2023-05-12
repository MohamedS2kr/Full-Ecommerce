import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createCategory } from '../../redux/actions/categoryAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import avatar from '../../images/avatar.png'

const AddCategoryHook = () => {
 
    const dispatch = useDispatch();
    const [img, setImg] = useState(avatar)
    const [name, setName] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    //to change name state
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value)
    }

    //when image change save it 
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0])
            setImg(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])//علشان تجبلي المسار بتاع الصورة ووتحفظه
        }
    }
    const res = useSelector(state => state.allCategory.category)

    //save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();//علشان مايعملش لود
        
        // بعلشان خاطر يطلع ليا نوتيفيكشن بالشرط ده
        if (name === "" || selectedFile === null) {
            console.log('من فضلك اكمل البيانات')
            notify('من فضلك اكمل البيانات', "warn");
            return;
        }
        const formData = new FormData();//دي صيغة انا ببعت بيها الداتا علشان فيها صور بيحولها بصيغه ويبعتها
        formData.append("name", name)
        formData.append("image", selectedFile)
        setLoading(true)
        setIsPress(true)
        await dispatch(createCategory(formData))//Action الي في  reduxالي انا عملتها في ال 
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            setImg(avatar)
            //بفضي الحقل بتاعي و الافاتار الي هيا الصورة الافتراضيه الي معياا
            setName("")
            setSelectedFile(null)
            console.log('تم الانتهاء')
            setLoading(true)
            setTimeout(() => setIsPress(false), 1000)

            if (res.status === 201) {
                notify('تمت عملية الاضافة بنجاح', "success");
            }
            else {
                notify('هناك مشكله فى عملية الاضافة', "error");
            }
        }
    }, [loading])//تتغير ينفذ تاني loadingعلشان لما ال 

    return [img, name, loading, isPress, handelSubmit, onImageChange, onChangeName]
};

export default AddCategoryHook
